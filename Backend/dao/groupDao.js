import { Group } from "../model/index.js";

const createGroup = async (groupName, description, admin, members) => {
  try {
    return await Group.create({ groupName, description, admin, members });
  } catch (e) {
    console.log("error creating group", e);
    throw new Error(e.message);
  }
};

const addUserToGroup = async (userId, groupId) => {
  try {
    return await Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: { userId, role: "member" } } },
      { new: true }
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const removeUserFromGroup = async (userId, groupId) => {
  try {
    return await Group.findByIdAndUpdate(
      groupId,
      { $pull: { members: { userId } } },
      { new: true }
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const getGroupMembers = async (groupId) => {
  try {
    return await Group.findById(groupId).populate(
      "members.userId",
      "phoneNumber username"
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const getGroupById = async (groupId) => {
  console.log("groupId in DAO ", groupId);
  try {
    return await Group.findById(groupId)
      .populate("admin", "username")
      .populate("members.userId", "username");
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const deleteGroupMessages = async (groupId) => {
  try {
    return await Message.deleteMany({ to: groupId, toModel: "Group" });
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteGroup = async (groupId) => {
  console.log("groupId", groupId);
  try {
    return await Group.findByIdAndDelete(groupId);
  } catch (e) {
    throw new Error(`Error deleting group: ${e.message}`);
  }
};

const groupDao = {
  createGroup,
  addUserToGroup,
  removeUserFromGroup,
  getGroupMembers,
  deleteGroupMessages,
  deleteGroup,
  getGroupById,
};

export default groupDao;
