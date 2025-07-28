import express from "express";
import { handleCreateTransaction } from "../controllers/transaction/transaction.controller.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { transactionSchema } from "../models/transaction/transactionSchema.js";
import verifyUserMiddleware from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

router.post(
  "/create",
  verifyUserMiddleware,
  validateMiddleware(transactionSchema),
  handleCreateTransaction
);

export default router;
