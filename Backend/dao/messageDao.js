import { Message } from "../model/index.js";
import { userDao } from "../dao/index.js";

const sendMessage = async (from, to, content) => {
  console.log(`from ${from} to ${to} content ${content} `);
  try {
    return await Message.create({ from, to, content });
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
      .populate([
        {
          path: "from",
          model: "User",
          select: "phoneNumber friends",
          populate: {
            path: "friends",
            model: "User",
            select: "phoneNumber ",
          },
        },
        {
          path: "to",
          model: "User",
          select: "phoneNumber",
        },
      ])
      .sort("timeStamp");
  } catch (e) {
    throw new Error(e);
  }
};

const messageDao = {
  sendMessage,
  getMessageBetweenUsers,
};

export default messageDao;
