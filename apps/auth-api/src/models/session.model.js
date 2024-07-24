import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
});

const sessionModel = mongoose.model("Session", sessionSchema);
export default sessionModel;
