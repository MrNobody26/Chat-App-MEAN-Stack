import { messageDao, userDao } from "../dao/index.js";

const sendMessage = async (from, to, content, toModel) => {
  const fromUser = await userDao.findUserByPhoneNumber(from);
  const toUser = await userDao.findUserByPhoneNumber(to);
  if (!fromUser || !toUser) {
    throw new Error("Couldn't find either of the users");
  }

  return await messageDao.sendMessage(
    fromUser._id,
    toUser._id,
    content,
    toModel
  );
};

const getMessages = async (userOneId, userTwoId) => {
  return await messageDao.getMessageBetweenUsers(userOneId, userTwoId);
};

const getMessagesInGroup = async (groupId) => {
  return await messageDao.getMessageInGroup(groupId);
};

const messageService = {
  sendMessage,
  getMessages,
  getMessagesInGroup,
};

export default messageService;
