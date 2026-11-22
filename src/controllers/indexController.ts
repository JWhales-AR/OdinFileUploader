import type { Request, Response } from "express";

export async function showOnSartPage(req: Request, res: Response) {
  if (req.user) {
    res.render("index", {});
  } else {
    res.redirect("/user/login");
  }
}
