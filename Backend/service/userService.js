import { userDao } from "../dao/index.js";
import bcrypt from "bcryptjs";

const register = async (username, password, phoneNumber) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    return await userDao.createUser({
      username,
      password: hashedPassword,
      phoneNumber,
    });
  } catch (e) {
    return e;
  }
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
  try {
    return await userDao.addFriend(userId, friendsData);
  } catch (e) {
    return e;
  }
};

const userService = { register, login };
export default userService;
