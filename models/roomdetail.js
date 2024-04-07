const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomdetails = new Schema(
  {
    room_id: { type: String },
    user_id: { type: String },
    active_users: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("roomdetails", roomdetails);
