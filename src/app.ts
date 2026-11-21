import "dotenv/config";
import express from "express";
import path from "node:path";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import session from "express-session";
import passport from "passport";

import sessionConfig from "./expressSessionConfig.ts";
import indexRouter from "./routes/indexRouter.ts";
import userRouter from "./routes/userRouter.ts";

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const PORT = process.env.PORT ?? 8080;
const __dirname = import.meta.dirname;
const assetsPath = path.join(__dirname, "public");

const app = express();

app.use(connectLiveReload());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));

app.use(session(sessionConfig));
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error occurred while starting Express");
    console.log(error);
  }
  console.log(`Express listening on port ${PORT}`);
});
