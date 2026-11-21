import { Router } from "express";

import * as index from "../controllers/indexController.ts";

const indexRouter = Router();

indexRouter.get("/", index.showOnSartPage);

export default indexRouter;
