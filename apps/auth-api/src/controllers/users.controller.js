import { Document, Types } from "mongoose";
import User from "../models/user.model";

const getUsers = async (req, res) => {
  try {
    // Fetch all users, including only the username field
    const users = await User.find({}, "username");
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req;
  try {
    // Fetch all users, including only the username field
    const foundUser = await User.findOne({ _id: userId }, "username");
    console.log(foundUser);
    res.status(200).json(foundUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export default getUsers;
