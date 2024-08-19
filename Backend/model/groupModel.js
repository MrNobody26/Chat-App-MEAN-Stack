import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  description: { type: String },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["admin", "member"], default: "member" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Group = mongoose.model("Group", GroupSchema);
export default Group;
