import bcrypt from "bcrypt";
import User from "../models/user.model";
import {generateJWTTokenAndSetSession} from "../utils/generateToken";
import Session from "../models/session.model";

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      res.status(201).json({ message: "Username already exists" });
    } else {
      const user = new User({ username: username, password: hashedPassword });
      await user.save();
      const token = generateJWTTokenAndSetSession(user, res);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "User reg failed!" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Auth failed" });
    const passwordMatch = await bcrypt.compare(password, user?.password || "");
    if (!passwordMatch) return res.status(401).json({ error: "Auth failed" });
    const token = generateJWTTokenAndSetSession(user, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Login failed" });
  }
};

export const logout = async (req, res) => {
   // Get token from cookie
  const token = req.cookies.jwt;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const deletedToken = await Session.deleteOne({ session:token });
    res.status(200).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Logout failed" });
  }
};
export default signup;
