import bcrypt from "bcrypt";
import User from "../models/user.model";
import generateJWTTokenAndSetCookie from "../utils/generateToken";

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      res.status(201).json({ message: "Username already exists" });
    } else {
      const user = new User({ username: username, password: hashedPassword });
      console.log(user);
      await user.save();
      generateJWTTokenAndSetCookie(user._id, res);
      res.status(201).json({ message: "User signed up successfully" });
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
    generateJWTTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Login failed" });
  }
};

export default signup;
