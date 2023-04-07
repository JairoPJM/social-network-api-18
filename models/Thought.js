const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const dateFormat = require("date-and-time");

const reactionSchema = new Schema({
  reactionId: {
    type: ObjectId,
    default: () => new ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (v) => dateFormat.format(v, "MMM DD YYYY [at] HH:mm"),
  },
}, { id: false });

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (v) => dateFormat.format(v, "MMM DD YYYY [at] HH:mm"),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
}, { id: false });

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
