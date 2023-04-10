const { Schema, Types } = require("mongoose");
const date = require("date-and-time");

// Define subdocument schema to be used in Post model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (v) => date.format(v, "MMM DD YYYY [at] HH:mm"),
    },
  },
  {
    toJSON: {
      // Override the default behavior to include virtuals
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
