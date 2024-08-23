import { Router } from "express";
import { groupController } from "../controller/index.js";
import authenticate from "../middleware/index.js";

const groupRouter = new Router();

groupRouter.post("/create-group", authenticate, groupController.createGroup);
groupRouter.post("/send", authenticate, groupController.sendMessage);
groupRouter.get("/get-messages", authenticate, groupController.getMessages);
groupRouter.patch("/add-member", authenticate, groupController.addMembrToGroup);
groupRouter.delete(
  "/delete-member",
  authenticate,
  groupController.deleteMembrFromGroup
);
groupRouter.delete("/delete-group", authenticate, groupController.deleteGroup);

export default groupRouter;
