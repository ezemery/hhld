import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  // not necessary to have receiver
  receiverId: {
    type: String,
    required: true,
  },
  // createdAt: {
  //     type: Date,
  //     default: Date.now
  // }
});

const conversationSchema = new mongoose.Schema({
  users: [
    {
      type: String,
      required: true,
    },
  ],
  msgs: [msgSchema],
});

const conversation = mongoose.model("Conversation", conversationSchema);

export default conversation;
