import userModel from "../../models/user/user.model.js";
import CustomError from "../../utils/CustomError.js";
import isValidObjectId from "../../utils/validateObjectId.js";
import { v2 as cloudinary } from "cloudinary";

export const handleUpdateUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const userData = req.body;

    const isValidId = isValidObjectId(user_id);
    if (!isValidId) {
      return next(new CustomError("Invalid user id.", 400));
    }

    const updateData = {};

    if (userData.name) {
      updateData.name = userData.name;
    }

    const avatar = userData?.avatar;
    if (userData?.avatar && typeof userData?.avatar == "object") {
      updateData.avatar = {
        public_id: avatar.public_id,
        url: avatar.url,
      };
    }

    console.log(updateData);

    const updatedUser = await userModel
      .findByIdAndUpdate(user_id, updateData, { new: true })
      .select("-password");
    if (!updatedUser) {
      return next(new CustomError("User not found.", 404));
    }

    return res.status(200).json({
      message: "User updatead successfully.",
      isSuccess: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(`Error while updating user data: ${error.message}`);
    return next(new CustomError("Internal server error", 500));
  }
};
