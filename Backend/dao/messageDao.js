import { Message } from "../model/index.js";
import { userDao } from "../dao/index.js";

const sendMessage = async (from, to, content, toModel) => {
  console.log(`from ${from} to ${to} content ${content} `);
  try {
    return await Message.create({ from, to, content, toModel });
  } catch (e) {
    throw new Error(e);
  }
};

const getMessageBetweenUsers = async (
  userOnePhoneNumber,
  userTwoPhoneNumber
) => {
  const userOnePhoneNumberId = await userDao.findUserByPhoneNumber(
    userOnePhoneNumber
  );
  const userTwoPhoneNumberId = await userDao.findUserByPhoneNumber(
    userTwoPhoneNumber
  );

  if (!userOnePhoneNumberId || !userTwoPhoneNumberId)
    throw new Error("One of the user does not exist");

  try {
    return await Message.find({
      $or: [
        { from: userOnePhoneNumberId._id, to: userTwoPhoneNumberId._id },
        { to: userOnePhoneNumberId._id, from: userTwoPhoneNumberId._id },
      ],
    })
      .populate("from", "username phoneNumber")
      .populate("to", "username phoneNumber")
      .sort("timeStamp");
  } catch (e) {
    console.log("error", e.message);
    throw new Error(e);
  }
};

const getMessageInGroup = async (groupId) => {
  try {
    return await Message.find({
      to: groupId,
      toModel: "Group",
    })
      .populate("from", "username phoneNumber")
      .populate({
        path: "to",
        select: "groupName",
      })
      .select("content timeStamp")
      .sort("timeStamp");
  } catch (e) {
    throw new Error(`Failed to get messages in group: ${e.message}`);
  }
};

const messageDao = {
  sendMessage,
  getMessageBetweenUsers,
  getMessageInGroup,
};

export default messageDao;
