import { Router } from "express";
import { messageController } from "../controller/index.js";
import authenticate from "../middleware/index.js";

const messageRouter = new Router();

messageRouter.post("/send", authenticate, messageController.sendMessage);
messageRouter.get("/:userId", authenticate, messageController.getMessages);

export default messageRouter;
