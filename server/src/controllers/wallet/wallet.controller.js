import walletModel from "../../models/wallet/wallet.model.js";
import CustomError from "../../utils/CustomError.js";
import isValidObjectId from "../../utils/validateObjectId.js";

export const handleCreateWallet = async (req, res, next) => {
  try {
    if (!req.body) {
      return next(new CustomError("All fields are required.", 400));
    }

    const { name, avatar } = req.body;

    const { id } = req.user;
    const createData = {};

    if (name) createData.name = name;
    if (avatar && typeof avatar == "object") {
      createData.avatar = {
        public_id: avatar.public_id,
        url: avatar.url,
      };
    }
    if (id) createData.user = id;

    await walletModel.create(createData);

    return res.status(201).json({
      message: "New wallet created successfully.",
      isSuccess: true,
    });
  } catch (error) {
    console.error(`Error while creating new wallet: ${error}`);
    return next(new CustomError("Internal server error.", 500));
  }
};

export const handleUpdateWallet = async (req, res, next) => {
  try {
    if (!req.body) {
      return next(new CustomError("All fields are required.", 400));
    }

    const { id } = req.user;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return next(new CustomError("Invalid user id.", 400));
    }

    const { wallet_id } = req.params;
    const isValidWalletId = isValidObjectId(wallet_id);
    if (!isValidWalletId) {
      return next(new CustomError("Invalid wallet id.", 400));
    }

    const { name, avatar, amount, total_income, total_expenses } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (avatar && typeof avatar == "object") {
      updateData.avatar = {
        public_id: avatar.public_id,
        url: avatar.url,
      };
    }
    if (amount) updateData.amount = amount;
    if (total_income) updateData.total_income = total_income;
    if (total_expenses) updateData.total_expenses = total_expenses;

    const updatedData = await walletModel.updateOne(
      { _id: wallet_id, user: id },
      updateData,
      { new: true }
    );
    if (updatedData.matchedCount === 0) {
      return next(new CustomError("bollet not found.", 404));
    }

    return res.status(200).json({
      message: "Wallet updated successfully.",
      isSuccess: true,
    });
  } catch (error) {
    console.error(`Error while updating new wallet: ${error}`);
    return next(new CustomError("Internal server error.", 500));
  }
};

export const handleDeleteWallet = async (req, res, next) => {
  try {
    const { id } = req.user;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return next(new CustomError("Invalid user id.", 400));
    }

    const { wallet_id } = req.params;
    const isValidWalletId = isValidObjectId(wallet_id);
    if (!isValidWalletId) {
      return next(new CustomError("Invalid wallet id.", 400));
    }

    const deletedWallet = await walletModel.deleteOne({
      _id: wallet_id,
      user: id,
    });
    if (deletedWallet.deletedCount === 0) {
      return next(new CustomError("Wallet not found for delete.", 404));
    }

    return res.status(200).json({
      message: "Wallet deleted successfully.",
      isSuccess: true,
    });
  } catch (error) {
    console.error(`Error while deleting wallet: ${error}`);
    return next(new CustomError("Internal server error.", 500));
  }
};

export const handleGetWallet = async (req, res, next) => {
  try {
    const { id } = req.user;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return next(new CustomError("Invalid user id.", 400));
    }

    const { wallet_id } = req.params;
    const isValidWalletId = isValidObjectId(wallet_id);
    if (!isValidWalletId) {
      return next(new CustomError("Invalid wallet id.", 400));
    }

    const wallet = await walletModel.findOne({ _id: wallet_id, user: id });
    if (!wallet) {
      return next(new CustomError("Wallet not found.", 404));
    }

    return res.status(200).json({
      message: "Wallet get successfully.",
      data: wallet,
      isSuccess: true,
    });
  } catch (error) {
    console.error(`Error while getting wallet: ${error}`);
    return next(new CustomError("Internal server error.", 500));
  }
};

export const handleGetAllWallet = async (req, res, next) => {
  try {
    const { id } = req.user;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return next(new CustomError("Invalid user id.", 400));
    }

    const wallet = await walletModel.find({ user: id });
    if (wallet.length == 0) {
      return next(new CustomError("Data not found.", 404));
    }

    return res.status(200).json({
      message: "All wallet get successfully.",
      data: wallet,
      isSuccess: true,
    });
  } catch (error) {
    console.error(`Error while getting all wallet: ${error}`);
    return next(new CustomError("Internal server error.", 500));
  }
};
