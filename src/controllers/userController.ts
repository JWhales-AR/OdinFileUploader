import type { Request, Response } from "express";

export async function getLoginForm(_req: Request, res: Response) {
  res.render("loginForm", {});
}

export async function getRegistrationForm(_req: Request, res: Response) {
  res.render("registrationForm", {});
}
