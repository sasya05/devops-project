const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  date: { type: String, unique: true },
  items: [String]
});

module.exports = mongoose.model("Menu", menuSchema);