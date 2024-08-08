import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now() },
});

const Message = mongoose.model("message", MessageSchema);

export default Message;
