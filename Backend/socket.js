import { messageService, groupService } from "./service/index.js";
import { verifyToken } from "./utils/index.js";
import { uploadImage } from "./utils/index.js";

const users = {};

export const socketSetUp = (io) => {
  io.use((socket, next) => {
    const authHeader = socket.handshake.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        try {
          const user = verifyToken(token);
          socket.userId = user.phoneNumber;
          users[socket.userId] = socket.id;
          next();
        } catch (e) {
          socket.emit("error", { message: "Authentication error", data: e });
          socket.disconnect();
        }
      }
    } else {
      socket.emit("error", {
        message: "Authentication error",
        data: "Token Not Found",
      });

      socket.disconnect();
    }
  });

  io.on("connection", (socket) => {
    console.log(`User conncted to ${socket.id}`);

    socket.on("private_message", async ({ to, content }) => {
      const from = socket.userId;
      const toSocketId = users[to];

      if (toSocketId) {
        if (content.type === "image") {
          const { error, url } = await uploadImage(content.content);

          if (error) {
            socket.emit("error", { message: error });
            return;
          }

          content.content = url;
        }

        try {
          await messageService.sendMessage(from, to, content);

          io.to(toSocketId).emit("private_message", {
            from,
            content,
          });
        } catch (e) {
          socket.emit("error", {
            message: "Server error Message Not saved",
            data: e,
          });
        }
      } else {
        console.log(`User ${to} not connected`);
        socket.emit("error", {
          message: "Server error",
          data: "User not connected",
        });
      }
    });

    io.on("group_message", async (groupId, content, toModel = "Group") => {
      const from = socket.userId;
      let group;
      try {
        group = await groupService.getGroupById(groupId);
      } catch (e) {
        socket.emit("error", {
          message: "Incorrect group Id",
          data: e.message,
        });
      }

      const members = group.members;

      if (content.type === "image") {
        const { error, url } = await uploadImage(content.content);

        if (error) {
          socket.emit("error", { message: error });
          return;
        }

        content.content = url;
      }

      try {
        await groupService.sendMessageInGroup(from, groupId, content, toModel);

        members.forEach(({ userId }) => {
          const memberSocketId = users[userId.phoneNumber];
          if (memberSocketId && userId.phoneNumber !== from) {
            io.to(memberSocketId).emit("group_message", {
              from,
              groupId,
              content,
            });
          }
        });
      } catch (e) {
        socket.emit("error", { message: e });
        return;
      }
    });

    io.on("create_group", async ({ groupName, description, members }) => {
      const adminId = socket.userId;
      try {
        const group = await groupService.createGroup(
          groupName,
          description,
          adminId,
          members
        );
        socket.emit("group_created", group);
      } catch (e) {
        socket.emit("error", { message: e });
        return;
      }
    });

    socket.on("add_user_to_group", async ({ groupId, userId }) => {
      try {
        await groupService.addUserToGroup(groupId, userId);
        socket.emit("user_added_to_group", { groupId, userId });
      } catch (error) {
        socket.emit("error", {
          message: "Server error: User not added to group",
          data: error,
        });
      }
    });

    socket.on("remove_user_from_group", async ({ groupId, userId }) => {
      try {
        await groupService.removeUserFromGroup(groupId, userId);
        socket.emit("user_removed_from_group", { groupId, userId });
      } catch (error) {
        socket.emit("error", {
          message: "Server error: User not removed from group",
          data: error,
        });
      }
    });

    socket.on("delete_Group", async ({ groupId, userId }) => {
      try {
        await groupService.deleteGroupAndCleanUp(groupId, userId);
        socket.emit("group_deleted", { groupId });
      } catch (error) {
        socket.emit("error", {
          message: "Server error: User not removed from group",
          data: error,
        });
      }
    });

    socket.on("disconnect", () => {
      delete users[socket.userId];
      console.log(`User disconnected: ${socket.userId}`);
    });
  });
};
