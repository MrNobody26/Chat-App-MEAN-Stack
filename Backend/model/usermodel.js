import mongoose from "mongoose";

const FriendsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const UserSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [FriendsSchema],
  },
  {
    versionKey: false,
  }
);

UserSchema.index({ phoneNumber: 1 });

const User = mongoose.model("User", UserSchema);

export default User;
