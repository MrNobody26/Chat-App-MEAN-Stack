import { User } from "../model/index.js";

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (e) {
    throw new Error(e);
  }
};

const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    return await User.findOne({ phoneNumber });
  } catch (e) {
    throw new Error(e);
  }
};

const addFriend = async (userPhoneNumber, friendsData) => {
  try {
    return await User.findOneAndUpdate(
      { phoneNumber: userPhoneNumber },
      { $push: { friends: friendsData } },
      { new: true }
    );
  } catch (e) {
    throw new Error(e);
  }
};

const getAllFriends = async (phoneNumber) => {
  try {
    const user = await User.findOne(phoneNumber).select("friends");
    return user ? user.friends : [];
  } catch (e) {
    throw new Error(e);
  }
};

const getOneFriendByPhoneNumber = async (
  userPhoneNumber,
  friendPhoneNumber
) => {
  try {
    const userFriend = await User.findOne({
      phoneNumber: userPhoneNumber,
      "friends.phoneNumber": friendPhoneNumber,
    });
    return userFriend;
  } catch (e) {
    throw new Error(e);
  }
};

const userDao = {
  createUser,
  findUserByPhoneNumber,
  getAllFriends,
  addFriend,
  getOneFriendByPhoneNumber,
};

export default userDao;
