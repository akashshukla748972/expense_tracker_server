import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./src/routes/auth.routes.js";
import errorHandler from "./src/middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to our expense tracker app",
  });
});

app.use(errorHandler)
export default app;
