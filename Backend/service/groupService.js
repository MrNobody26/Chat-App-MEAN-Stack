import { groupDao, messageDao, userDao } from "../dao/index.js";

const getGroupById = async (groupId) => {
  try {
    return await groupDao.findById(groupId);
  } catch (e) {
    throw new Error(e.message);
  }
};

const sendMessageInGroup = async (userId, groupId, content, toModel) => {
  const fromUser = await userDao.findUserByPhoneNumber(userId);
  const toGroup = await groupDao.findById(groupId);

  if (!fromUser || !toGroup) {
    throw new Error("Couldn't find User Or Group");
  }

  return await messageDao.sendMessage(
    fromUser._id,
    toGroup._id,
    content,
    toModel
  );
};

const createGroup = async (groupName, description, admin, members) => {
  console.log("admin", admin);
  const adminId = await userDao.findUserByPhoneNumber(admin);
  if (!adminId) {
    throw new Error("Couldn't find the Admin");
  }

  try {
    const memberIds = await userDao.getUserIdByPhoneNumbers(members);
    const newMemberIds = memberIds.map((id) => {
      return { userId: id };
    });

    newMemberIds.push({
      userId: adminId._id,
      role: "admin",
    });

    const group = await groupDao.createGroup(
      groupName,
      description,
      adminId._id,
      newMemberIds
    );
    const memberUserIds = group.members.map((member) => member.userId);

    await userDao.addGroupToUsers(memberUserIds, group._id);
    return group;
  } catch (e) {
    throw new Error(e);
  }
};

const addUserToGroup = async (userId, groupId) => {
  const user = await userDao.findUserByPhoneNumber(userId);
  if (!user) {
    throw new Error("User does not exist");
  }

  try {
    const group = await groupDao.getGroupById(groupId);
    await groupDao.addUserToGroup(group._id, user._id);
    const newUser = await groupDao.addGroupToUserId(group._id, user._id);

    return newUser;
  } catch (e) {
    throw new Error(e);
  }
};

const removeUserFromGroup = async (userId, groupId, adminUser) => {
  console.log("groupId", groupId);
  const group = await groupDao.getGroupById(groupId);
  console.log("group", group);
  if (!group) {
    throw new Error("Group does not exist");
  }

  const user = await userDao.findUserByPhoneNumber(userId);
  console.log("User in service", user);
  const adminUserId = await userDao.findUserByPhoneNumber(adminUser);

  if (!user) {
    throw new Error("User does not exist");
  }

  if (group.admin._id.toString() !== adminUserId._id.toString()) {
    throw new Error("User does not have permission to remove other user");
  }

  try {
    await groupDao.removeUserFromGroup(group._id, user._id);
    const newUser = await userDao.removeGroupFromUserId(group._id, user._id);

    return newUser;
  } catch (e) {
    console.log(e, "error in service");
    throw new Error(e);
  }
};

const deleteGroupAndCleanUp = async (groupId, userId) => {
  const group = await groupDao.getGroupById(groupId);
  if (!group) {
    throw new Error("Group does not exist");
  }

  const user = await userDao.findUserByPhoneNumber(userId);

  if (!user) {
    throw new Error("User does not exist");
  }

  if (group.admin._id.toString() !== user._id.toString()) {
    throw new Error("User does not have permission to delete group");
  }

  try {
    await groupDao.deleteGroup(group._id);
    console.log("Group deleted successfully");

    await userDao.removeGroupFromUsers(group._id);
    console.log("Group users removed successfully");

    // chcek if messages are there in group
    const messages = await messageDao.getMessageInGroup(group._id);

    if (messages.length > 0) {
      await groupDao.deleteGroupMessages(group._id);
      console.log("Group messages deleted successfully");
    }

    console.log(`Group ${groupId} and related data successfully deleted.`);
    return true;
  } catch (e) {
    console.log("error deleting group", e);
    throw new Error(`Error deleting group ${groupId}: ${e.message}`);
  }
};

const groupService = {
  getGroupById,
  sendMessageInGroup,
  createGroup,
  addUserToGroup,
  removeUserFromGroup,
  deleteGroupAndCleanUp,
};

export default groupService;
