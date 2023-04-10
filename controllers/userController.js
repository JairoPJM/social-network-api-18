const { User, Thought } = require("../models");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then(async (users) => {return res.json(users);})
      .catch((err) => {return res.status(500).json(err);});
  },
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__V')
      .populate("thoughts")
      .populate("friends")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUserById(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUserById(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User account and thoughts deleted" }))
      .catch((err) => res.status(500).json(err));
  },
  addFriendById(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeFriendById(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json({ message: "Friend removed" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
