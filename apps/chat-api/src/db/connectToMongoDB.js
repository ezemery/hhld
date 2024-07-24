import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // add this in .env
    console.log("Connected to MongoDB");
  } catch (errory) {
    console.log("Error in connecting to MongoDB", error);
  }
};

export default connectToMongoDB;
