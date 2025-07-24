import express from "express";
import verifyUserMiddleware from "../middlewares/verifyUser.middleware.js";
import { handleUpdateUser } from "../controllers/user/user.controller.js";

const router = express.Router();

router.put("/update/:user_id", verifyUserMiddleware, handleUpdateUser);

export default router;
