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
    username: { type: String, required: true },
    password: { type: String, required: true },
    friends: [FriendsSchema],
  },
  {
    versionKey: false,
  }
);

UserSchema.index({ phoneNumber: 1 }, { unique: true });
UserSchema.index(
  { "friends.phoneNumber": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "friends.phoneNumber": { $exists: true, $ne: null },
    },
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
