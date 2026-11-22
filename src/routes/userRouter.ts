import { Router } from "express";

import * as user from "../controllers/userController.ts";
import bcryptMiddleware from "../middlewares/bcryptMiddleware.ts";

const userRouter = Router();

userRouter.get("/login", user.getLoginForm);
userRouter.post("/login", user.authenticateUser);

userRouter.get("/register", user.getRegistrationForm);
userRouter.post("/register", bcryptMiddleware, user.registerUser);

userRouter.get("/logout", user.logoutUser);

export default userRouter;
