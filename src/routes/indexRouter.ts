import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (_req, res) => {
  res.render("index", {});
});

export default indexRouter;
