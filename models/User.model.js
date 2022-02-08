const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: String,
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true, 
      required: true,
    }
  },
  {
    // extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
