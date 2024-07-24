import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import msgsRouter from "./routes/msgs.routes";

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
    .use("/msgs", msgsRouter);

  app.get("/status", (_, res) => {
    return res.json({ ok: true });
  });

  return app;
};
