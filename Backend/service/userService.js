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
  return await userDao.addFriend(userId, friendsData);
};

const getFriends = async (userId) => {
  return await userDao.getAllFriends(userId);
};

const userService = { register, login, addFriend, getFriends };
export default userService;
