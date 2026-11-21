import type { Request, Response } from "express";

export async function showOnSartPage(_req: Request, res: Response) {
  res.redirect("/user/login");
}
