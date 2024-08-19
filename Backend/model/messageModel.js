import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "image"],
      required: true,
      default: "text",
    },
    content: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const MessageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "toModel",
    required: true,
  },
  toModel: {
    type: String,
    enum: ["User", "Group"],
    required: true,
    default: "User",
  },
  content: ContentSchema,
  timeStamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
