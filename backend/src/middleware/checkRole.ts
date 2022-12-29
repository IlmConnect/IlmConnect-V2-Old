import { Request, Response, NextFunction } from "express";
import config from "../config";
import { User } from "@prisma/client";

const roles = {
  admin: ["course.create", "course.read", "course.delete", "course.update"],
  teacher: ["course.create", "course.read", "course.delete", "course.update"], // teacher should only update, delete if they own course/post
  student: ["course.read"],
};

// authorization middleware for user roles
const checkPermission =
  (permissions: Permissions[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    // TODO:
    // grab user role (would I need a function to fetch user role from database?)
    // check user role
    // next()

    // check if user role is admin
    const userRole = req.body;
    if (req.userRole === "admin") {
      next();
    } else {
      res.status(403).send({ message: "User Unauthorized" });
    }
  };

export default checkPermission;
