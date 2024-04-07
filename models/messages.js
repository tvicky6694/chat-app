
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messages = new Schema(
  {
    room_id: { type: String },
    user_id: { type: String },
    message: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", messages);
