const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  content: { type: String, required: true },
  name: { type: String, required: true },
  blogpost: { type: mongoose.Schema.Types.ObjectId, ref: "Blogpost" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
