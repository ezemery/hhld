import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generateJWTTokenAndSetCookie = (
  userId: Types.ObjectId,
  res: {
    cookie: (
      arg0: string,
      arg1: never,
      arg2: {
        maxAge: number; //miliseconds
        httpOnly: boolean;
        sameSite: string;
        secure: boolean;
      },
    ) => void;
  },
) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //miliseconds
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
};

export default generateJWTTokenAndSetCookie;
