import Message from "../model/index.js";

const createMessage = async (from, to, content) => {
  try {
    return await Message.create({ from, to, content });
  } catch (e) {
    return e;
  }
};

const getMessageBetweenUsers = async (
  userOnePhoneNumber,
  userTwoPhoneNumber
) => {
  try {
    return await Message.find({
      $or: [
        { from: userOnePhoneNumber, to: userTwoPhoneNumber },
        { to: userOnePhoneNumber, from: userTwoPhoneNumber },
      ],
    }).sort("timeStamp");
  } catch (e) {
    return e;
  }
};

const messageDao = {
  createMessage,
  getMessageBetweenUsers,
};

export default messageDao;
