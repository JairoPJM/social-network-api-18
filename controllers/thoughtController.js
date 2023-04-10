const { Thought, User } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then(async(thoughts) => {return res.json(thoughts);
      })
      .catch((err) => {return res.status(500).json(err)
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select('-__V')
      .then(async(thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createNewThought(req, res) {
    Thought.create(req.body)
      .then((newThought) => {
         return User.findOneAndUpdate(
          { userName: req.body.userName },
          { $push: { thoughts: newThought._id } },
          { new: true }
        )
      })
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));

  },
  updateExistingThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteExistingThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({
                message: "Thought deleted, but no user found with that thought",
              })
          : res.json({
              message: `Thought deleted and removed from ${user.username}'s profile`,
            })
      )
      .catch((err) => res.status(500).json(err));
  },
  createNewReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteExistingReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json({ message: "Reaction deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
