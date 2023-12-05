const mongoose = require("mongoose");

const voteSchema = mongoose.Schema({
  candidateName: {
    type: String,
  },
  uservote: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Vote", voteSchema);
