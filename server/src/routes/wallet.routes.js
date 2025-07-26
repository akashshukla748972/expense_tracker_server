import express from "express";
import verifyUserMiddleware from "../middlewares/verifyUser.middleware.js";
import {
  handleCreateWallet,
  handleDeleteWallet,
  handleGetAllWallet,
  handleGetWallet,
  handleUpdateWallet,
} from "../controllers/wallet/wallet.controller.js";

const router = express.Router();

router.post("/create", verifyUserMiddleware, handleCreateWallet);
router.put("/update/:wallet_id", verifyUserMiddleware, handleUpdateWallet);
router.delete("/delete/:wallet_id", verifyUserMiddleware, handleDeleteWallet);
router.get("/get-wallet/:wallet_id", verifyUserMiddleware, handleGetWallet);
router.get("/get-all-wallet", verifyUserMiddleware, handleGetAllWallet);

export default router;
