import { Router } from "express";

import * as user from "../controllers/userController.ts";

const userRouter = Router();

userRouter.get("/login", user.getLoginForm);
userRouter.get("/register", user.getRegistrationForm);

export default userRouter;
