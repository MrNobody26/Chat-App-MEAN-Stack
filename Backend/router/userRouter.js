import { Router } from "express";
import { userController } from "../controller/index.js";
import authenticate from "../middleware/index.js";

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.patch("/add-friend", authenticate, userController.addFriend);
userRouter.get("/get-friends", authenticate, userController.getAllFriends);

export default userRouter;
