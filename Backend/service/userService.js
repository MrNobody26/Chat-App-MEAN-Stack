import { userDao } from "../dao/index.js";
import bcrypt from "bcryptjs";

const register = async (username, password, phoneNumber) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await userDao.createUser({
    username,
    password: hashedPassword,
    phoneNumber,
  });
};

const login = async (phoneNumber, password) => {
  const user = await userDao.findUserByPhoneNumber(phoneNumber);
  if (!user) {
    return null;
  }
  const passwordIsMatch = await bcrypt.compare(password, user.password);
  return passwordIsMatch ? user : null;
};

const addFriend = async (userId, friendsData) => {
  const userFriend = await userDao.getOneFriendByPhoneNumber(
    userId,
    friendsData.phoneNumber
  );
  if (userFriend) {
    throw new Error("Friend already exists");
  } else {
    return await userDao.addFriend(userId, friendsData);
  }
};

const getFriends = async (userId) => {
  return await userDao.getAllFriends(userId);
};

const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    const user = await userDao.findUserByPhoneNumber(phoneNumber);
    return user ? user : null;
  } catch (e) {
    throw new Error(e);
  }
};

const userService = {
  register,
  login,
  addFriend,
  getFriends,
  findUserByPhoneNumber,
};
export default userService;
