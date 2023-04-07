const mongoose = require("mongoose");

// Create a user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      // Regular expression to validate email format
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Virtual property "friendCount" that retrieves the length of the user's `friends` array field on query
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create a User model based on the user schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
