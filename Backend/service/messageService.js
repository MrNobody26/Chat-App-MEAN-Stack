import { messageDao } from "../dao/index.js";

const sendMessage = async (from, to, content) => {
  return await messageDao.sendMessage(from, to, content);
};

const getMessages = async (userOneId, userTwoId) => {
  return await messageDao.getMessageBetweenUsers(userOneId, userTwoId);
};

const messageService = {
  sendMessage,
  getMessages,
};

export default messageService;
