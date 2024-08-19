import { messageService } from "../service/index.js";

const sendMessage = async (req, res) => {
  const { to, content, toModel } = req.body;
  const from = req.user.phoneNumber;
  try {
    const message = await messageService.sendMessage(
      from,
      to,
      content,
      toModel
    );
    res
      .status(200)
      .json({ message: "Message sent successfully", data: message });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", data: error });
  }
};

const getMessages = async (req, res) => {
  const userOneId = req.user.phoneNumber;
  const userTwoId = req.params.userId;

  try {
    const messages = await messageService.getMessages(userOneId, userTwoId);
    res
      .status(200)
      .json({ message: "Messages successfully retrived", data: messages });
  } catch (error) {
    res.status(500).json({ message: "Failed to get messages", data: error });
  }
};
const uploadImage = async (req, res) => {
  console.log("in upload image");
  console.log(req);
};

const messageController = {
  sendMessage,
  getMessages,
  uploadImage,
};

export default messageController;
