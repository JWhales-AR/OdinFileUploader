import passport from "passport";
import type { NextFunction, Request, Response } from "express";

import prisma from "../prisma.ts";

export async function getLoginForm(_req: Request, res: Response) {
  res.render("loginForm", {});
}

export async function getRegistrationForm(_req: Request, res: Response) {
  res.render("registrationForm", {});
}

export const authenticateUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  failureMessage: true,
});

export async function registerUser(req: Request, res: Response) {
  await prisma.user.create({
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
  });
  res.redirect("/");
}

export async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}
