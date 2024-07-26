import jwt from "jsonwebtoken";
import Session from "../models/session.model";

const verifyToken = async (req, res, next) => {
  // Get token from cookie
  //const token = req.cookies.jwt;
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(' ')[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify token
    const foundToken = await Session.findOne({ session:token });
    if(foundToken){
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    }else{
       res.status(401).json({ message: "Unauthorized user" });
    }
  } catch (error) {
     res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;
