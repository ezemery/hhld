import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import usersRouter from "./routes/users.route";
import userRouter from "./routes/user.route";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_APP,
      }),
    )
    .use(cookieParser())
    .use(express.json())
    .use("/users", usersRouter)
    .use("/user", userRouter)
    .use("/auth", authRouter);

  app.get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  });

  app.get("/status", (_, res) => {
    return res.json({ ok: true });
  });

  return app;
};
