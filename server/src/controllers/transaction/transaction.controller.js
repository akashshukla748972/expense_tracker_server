import mongoose from "mongoose";
import TransactionModel from "../../models/transaction/transaction.model.js";
import CustomError from "../../utils/CustomError.js";
import walletModel from "../../models/wallet/wallet.model.js";
import isValidObjectId from "../../utils/validateObjectId.js";

export const handleCreateTransaction = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { type, category, walletId, date, description, avatar } = req.body;

    const { id } = req.user;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return next(new CustomError("Invalid user id.", 400));
    }

    const isValidWalletId = isValidObjectId(walletId);
    if (!isValidWalletId) {
      return next(new CustomError("Invalid wallet id.", 400));
    }

    const wallet = await walletModel
      .findOne({ _id: walletId, user: id })
      .session(session);

    if (!wallet) {
      session.abortTransaction();
      return next(new CustomError("Wallet not found.", 400));
    }

    let { amount } = req.body;
    amount = parseInt(amount);

    if (type === "expense" && wallet.amount < amount) {
      session.abortTransaction();
      return next(new CustomError("Insufficient balance", 400));
    }

    if (type === "income") {
      wallet.amount += amount;
      wallet.total_income += amount;
    }
    if (type == "expense") {
      wallet.amount -= amount;
      wallet.total_expenses += amount;
    }
    await wallet.save({ session });

    const createTransaction = {
      user: id,
    };
    if (type) createTransaction.type = type;
    if (amount) createTransaction.amount = amount;
    if (category) createTransaction.category = category;
    if (walletId) createTransaction.walletId = walletId;
    if (date) createTransaction.date = new Date(date).toISOString();
    if (description) createTransaction.description = description;
    if (type) createTransaction.type = type;
    if (avatar && typeof avatar === "object") {
      createTransaction.avatar = {
        public_id: avatar.public_id,
        url: avatar.url,
      };
    }

    console.log(createTransaction);

    // create transaction
    const newTransaction = new TransactionModel(createTransaction);
    await newTransaction.save({ session });

    session.commitTransaction();

    return res.status(201).json({
      message: "Transaction added successfully.",
      data: newTransaction,
    });
  } catch (error) {
    session.abortTransaction();
    console.error(`Error while create new transaction: ${error.message}`);
    return next(new CustomError("Internal server error.", 500));
  } finally {
    session.endSession();
  }
};
