import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import Session from "../models/session.model";

export const generateJWTTokenAndSetSession = async (
  user,
  res,
) => {
  const token = jwt.sign({ userId:user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  const session = new Session({ username: user._id, session: token });
  await session.save();
  console.log(token)
  res.status(200).json({
      _id: user._id,
      username: user.username,
      token
    });
};

const generateJWTTokenAndSetCookie = (
  userId,
  res,
) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //miliseconds
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};

export default generateJWTTokenAndSetCookie;
