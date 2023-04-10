const {Schema,model} = require("mongoose");
const dateFormat = require("date-and-time");
const reactionSchema = require('./Reaction')

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
  userName: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
{
  
    toJSON: {
      getters: true,
      virtual: true,
    },
  
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
