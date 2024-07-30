import jwt from "jsonwebtoken";
import Teacher from "../models/teacherModel.js";
import Student from "../models/studentModel.js";
import asyncHandler from "express-async-handler";
import { JWT_SECRET } from "../config/constants.mjs";

export const protectTeacher = asyncHandler(async (req, res, next) => {
  //console.log(req.headers.authorization)
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await Teacher.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const protectStudent = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await Student.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
