const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  username: String,
  ratings: { type: Object, default: {} }, // ⭐ per item
  comment: String,
  date: String
});

module.exports = mongoose.model("Feedback", feedbackSchema);