import mongoose from "mongoose";
import TransactionModel from "../../models/transaction/transaction.model.js";
import CustomError from "../../utils/CustomError.js";
import walletModel from "../../models/wallet/wallet.model.js";
import isValidObjectId from "../../utils/validateObjectId.js";

export const handleCreateTransaction = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const { type, category, walletId, date, description, avatar } = req.body;
    const { id } = req.user;

    if (!isValidObjectId(id)) {
      await session.abortTransaction();
      return next(new CustomError("Invalid user id.", 400));
    }

    if (!isValidObjectId(walletId)) {
      await session.abortTransaction();
      return next(new CustomError("Invalid wallet id.", 400));
    }

    if (type === "expense" && !category) {
      await session.abortTransaction();
      return next(new CustomError("Expense category is required.", 400));
    }

    const wallet = await walletModel
      .findOne({ _id: walletId, user: id })
      .session(session);
    if (!wallet) {
      await session.abortTransaction();
      return next(new CustomError("Wallet not found.", 400));
    }

    let { amount } = req.body;
    amount = parseInt(amount);

    if (type === "expense" && wallet.amount < amount) {
      await session.abortTransaction();
      return next(new CustomError("Insufficient balance", 400));
    }

    if (type === "income") {
      wallet.amount += amount;
      wallet.total_income += amount;
    } else if (type === "expense") {
      wallet.amount -= amount;
      wallet.total_expenses += amount;
    }

    await wallet.save({ session });

    const createTransaction = {
      user: id,
      type,
      amount,
      category,
      walletId,
      date: date ? new Date(date).toISOString() : undefined,
      description,
    };

    if (avatar && typeof avatar === "object") {
      createTransaction.avatar = {
        public_id: avatar.public_id,
        url: avatar.url,
      };
    }

    const newTransaction = new TransactionModel(createTransaction);
    await newTransaction.save({ session });

    await session.commitTransaction();

    return res.status(201).json({
      message: "Transaction added successfully.",
      data: newTransaction,
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    console.error(`❌ Error while creating transaction: ${error.message}`);
    return next(new CustomError("Internal server error.", 500));
  } finally {
    await session.endSession();
  }
};

export const handleGetAllTransaction = async (req, res, next) => {
  try {
    const { id } = req.user;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return next(new CustomError("Invalid user id.", 400));
    }

    const transaction = await TransactionModel.find({ user: id }).sort({
      createdAt: -1,
    });
    if (transaction.length == 0) {
      return next(new CustomError("Data not found.", 404));
    }

    return res.status(200).json({
      message: "All transaction get successfully.",
      data: transaction,
      isSuccess: true,
    });
  } catch (error) {
    console.error(`Error while getting all transaction: ${error}`);
    return next(new CustomError("Internal server error.", 500));
  }
};
