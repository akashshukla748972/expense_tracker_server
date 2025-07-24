import express from "express";
import {
  handleLoginUser,
  handleRegisterUser,
} from "../controllers/auth/auth.controller.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { registerSchema } from "../models/user/registerSchema.js";
import { loginSchema } from "../models/user/loginSchema.js";

const router = express.Router();

router.post(
  "/register",
  validateMiddleware(registerSchema),
  handleRegisterUser
);
router.post("/login", validateMiddleware(loginSchema), handleLoginUser);

export default router;
