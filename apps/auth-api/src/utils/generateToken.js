import jwt from "jsonwebtoken";
import { Types } from "mongoose";

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
