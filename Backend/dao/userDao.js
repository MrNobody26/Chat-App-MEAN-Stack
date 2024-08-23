import { User } from "../model/index.js";

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (e) {
    throw new Error(e.message);
  }
};

const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    return await User.findOne({ phoneNumber });
  } catch (e) {
    throw new Error(e.message);
  }
};

const addFriend = async (userPhoneNumber, friendsData) => {
  try {
    return await User.findOneAndUpdate(
      { phoneNumber: userPhoneNumber },
      { $push: { friends: friendsData } },
      { new: true, runValidators: true }
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const getAllFriends = async (phoneNumber) => {
  try {
    const user = await User.findOne({ phoneNumber }).select("friends");
    return user ? user.friends : [];
  } catch (e) {
    throw new Error(e.message);
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
    throw new Error(e.message);
  }
};

const getUserIdByPhoneNumbers = async (phoneNumbers) => {
  console.log("phoneNumbers", phoneNumbers);
  try {
    const users = await User.find(
      { phoneNumber: { $in: phoneNumbers } },
      "_id"
    );
    return users.map((user) => user._id);
  } catch (e) {
    console.error("Error fetching user IDs:", error);
    throw new Error(e);
  }
};

const addGroupToUsers = async (userIds, groupId) => {
  try {
    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { $addToSet: { groups: groupId } }
    );
    return result;
  } catch (e) {
    console.error(`Error updating users with new group: ${e.message}`);
    throw new Error(e);
  }
};

const removeGroupFromUserId = async (groupId, userId) => {
  console.log("userId: " + userId + " groupId: " + groupId);
  try {
    await User.updateOne({ _id: userId }, { $pull: { groups: groupId } });
  } catch (e) {
    console.log("Failed to remove group from user:");
    throw new Error(e);
  }
};

const addGroupToUserId = async (groupId, userId) => {
  console.log("userId: " + userId + " groupId: " + groupId);
  try {
    await User.updateOne({ _id: userId }, { $addToSet: { groups: groupId } });
  } catch (e) {
    console.log("Failed to add group to user:", e.message);
    throw new Error(e);
  }
};

const removeGroupFromUsers = async (groupId) => {
  try {
    console.log("inside removing group from user table");
    return await User.updateMany(
      { groups: groupId },
      { $pull: { groups: groupId } }
    );
  } catch (e) {
    console.log("Failed to remove group from user:", e.message);
    throw new Error(e.message);
  }
};

const userDao = {
  createUser,
  findUserByPhoneNumber,
  getAllFriends,
  addFriend,
  getOneFriendByPhoneNumber,
  getUserIdByPhoneNumbers,
  addGroupToUsers,
  removeGroupFromUserId,
  addGroupToUserId,
  removeGroupFromUsers,
};

export default userDao;
