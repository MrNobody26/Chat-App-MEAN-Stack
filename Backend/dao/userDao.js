import User from "../model/index.js";

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (e) {
    return e;
  }
};
const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    return await User.findOne({ phoneNumber });
  } catch (e) {
    return e;
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
    return e;
  }
};

const getAllFriends = async (phoneNumber) => {
  try {
    const user = await User.findOne(phoneNumber).select("friends");
    return user ? user.friends : [];
  } catch (e) {
    return e;
  }
};

const userDao = {
  createUser,
  findUserByPhoneNumber,
  getAllFriends,
  addFriend,
};

export default userDao;
