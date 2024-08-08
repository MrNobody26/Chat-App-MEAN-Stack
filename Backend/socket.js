import { messageService } from "./service/index.js";
import { verifyToken } from "./utils/index.js";

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
        io.to(toSocketId).emit("private_message", {
          from,
          content,
        });
        try {
          await messageService.sendMessage(from, to, content);
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

    socket.on("disconnect", () => {
      delete users[socket.userId];
      console.log(`User disconnected: ${socket.userId}`);
    });
  });
};
