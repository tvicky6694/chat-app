const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    active_status: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", users);
