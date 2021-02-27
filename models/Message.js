const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    from: { type: mongoose.Types.ObjectId, ref: "User" },
    to: { type: mongoose.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["seen", "unseen"], default: "unseen" },
    isDeleted: false,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
