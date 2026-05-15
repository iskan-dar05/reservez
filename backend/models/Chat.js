const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  //participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Chat between users
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  customerName: { type: String, required: true },
  ownerName: { type: String, required: true },
  messages: [messageSchema],
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);
