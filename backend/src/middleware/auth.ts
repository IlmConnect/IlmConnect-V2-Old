import { Request, Response, NextFunction } from "express";
import config from "../config";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

interface RequestWithUser extends Request {
  user: User | undefined;
}

const verifyToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  //splitting token string for "Bearer"
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Error! Token was not provided." });
  }

  const decodedToken = jwt.verify(token, config.auth.jwt.key);
  req.user = decodedToken as User;
  next();
};

export default verifyToken;
