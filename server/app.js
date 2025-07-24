import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/user.routes.js";

import errorHandler from "./src/middlewares/error.middleware.js";
import CustomError from "./src/utils/CustomError.js";
import connectToCloudinary from "./src/configs/cloudinary.js";

const app = express();

connectToCloudinary();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use((req, res, next) => {
  return next(new CustomError("Page not found.", 404));
});

app.use(errorHandler);
export default app;
