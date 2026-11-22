import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";

const SALT = 10;

export default async function bcryptMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, SALT);
    next();
  } else {
    next(new Error("Expected a password field in request body"));
  }
}
