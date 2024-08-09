import { messageDao, userDao } from "../dao/index.js";

const sendMessage = async (from, to, content) => {
  const fromUser = await userDao.findUserByPhoneNumber(from);
  const toUser = await userDao.findUserByPhoneNumber(to);
  if (!fromUser || !toUser) {
    throw new Error("Couldn't find either of the users");
  }
  return await messageDao.sendMessage(fromUser._id, toUser._id, content);
};

const getMessages = async (userOneId, userTwoId) => {
  return await messageDao.getMessageBetweenUsers(userOneId, userTwoId);
};

const messageService = {
  sendMessage,
  getMessages,
};

export default messageService;
