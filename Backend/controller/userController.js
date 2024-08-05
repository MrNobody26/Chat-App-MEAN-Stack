import { userService, authServices } from "../service/index.js";

const register = async (req, res) => {
  console.log("register called");
  const { username, phoneNumber, password } = req.body;
  try {
    const user = await userService.register(username, password, phoneNumber);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "User registration failed", data: error });
  }
};

const login = async (req, res) => {
  console.log(req.headers);
  console.log("login called");
  const { phoneNumber, password } = req.body;

  const user = await userService.login(phoneNumber, password);
  if (!user) {
    res.status(400).json({ message: "Invalid Credentials" });
  }

  const token = authServices.generateToken(phoneNumber);
  res.status(200).json({ message: "login successful", token, user: user });
};

const addFriend = async (req, res) => {
  console.log("add friend");
  const { name, phoneNumber } = req.body;
  const userId = req.user.phoneNumber;
  try {
    const friend = await userService.addFriend(userId, {
      phoneNumber,
      name,
    });
    res
      .status(200)
      .json({ message: "Friend added successfully", data: friend });
  } catch (error) {
    res.status(400).json({ message: "Adding contact failed", data: error });
  }
};

const getAllFriends = async (req, res) => {
  const userId = req.phoneNumber;
  try {
    const friends = await userService.getFriends(userId);
    res
      .status(200)
      .json({ message: "Friend fetched successfully", data: friends });
  } catch (error) {
    res.status(400).json({ message: "Failed getting friends", data: error });
  }
};

const userController = {
  register,
  login,
  addFriend,
  getAllFriends,
};

export default userController;
