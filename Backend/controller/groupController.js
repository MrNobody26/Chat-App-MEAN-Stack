import { groupService, messageService, userService } from "../service/index.js";

const sendMessage = async (req, res) => {
  const userId = req.user.phoneNumber;
  const { groupId, content, toModel } = req.body;

  try {
    const message = await groupService.sendMessageInGroup(
      userId,
      groupId,
      content,
      toModel
    );

    res.status(200).json({
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    res.status(200).json({
      message: "Failed to send Message",
      data: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  const groupId = req.body.groupId;
  try {
    const message = await messageService.getMessagesInGroup(groupId);

    res.status(200).json({
      message: "Group messages retrived successfully",
      data: message,
    });
  } catch (error) {
    res.status(200).json({
      message: "Failed to retrive group Message",
      data: error.message,
    });
  }
};

const createGroup = async (req, res) => {
  const admin = req.user.phoneNumber;
  const { groupName, description, members } = req.body;

  try {
    const message = await groupService.createGroup(
      groupName,
      description,
      admin,
      members
    );

    res.status(200).json({
      message: "Group created successfully",
      data: message,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create Group",
      data: error.message,
    });
  }
};

const addMembrToGroup = async (req, res) => {
  const { groupId, userId } = req.body;

  try {
    const newUser = await groupService.addUserToGroup(userId, groupId);
    res.status(200).json({
      message: "User added to group successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to Add User to Group",
      data: error.message,
    });
  }
};

const deleteMembrFromGroup = async (req, res) => {
  const adminUser = req.user.phoneNumber;
  const { groupId, userId } = req.body;

  try {
    const newUser = await groupService.removeUserFromGroup(
      userId,
      groupId,
      adminUser
    );

    res.status(200).json({
      message: "User removed from group successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to Remove User from Group",
      data: error.message,
    });
  }
};

const deleteGroup = async (req, res) => {
  const userId = req.user.phoneNumber;
  const groupId = req.body.groupId;
  try {
    const sucess = await groupService.deleteGroupAndCleanUp(groupId, userId);
    console.log("herer @@@", sucess);
    if (sucess) {
      console.log("inside sending respons");
      res.status(200).json({
        message: "Group deleted successfully",
      });
    } else {
      res.status(400).json({
        message: "Failed to delete the Group Process Failure",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete the Group",
      data: error.message,
    });
  }
};

const groupController = {
  sendMessage,
  getMessages,
  createGroup,
  addMembrToGroup,
  deleteMembrFromGroup,
  deleteGroup,
};

export default groupController;
