import { token } from "morgan";
import userModel from "../../models/user/user.model.js";
import { genHash } from "../../services/hash.js";
import CustomError from "../../utils/CustomError.js";
import { genToken } from "../../services/token.js";
import bcrypt from "bcrypt";

export const handleRegisterUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isExistEmail = await userModel.findOne({ email });
    if (isExistEmail) {
      return next(new CustomError("Email already exist. Plese login.", 409));
    }

    const { hashedPassword } = await genHash(password);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const user = await userModel.findById(newUser._id).select("-password");

    const payload = {
      id: user?._id,
      email: user?.email,
    };
    const { token } = await genToken(payload);

    return res.status(201).json({
      message: "User registered successfully.",
      token,
      data: user,
      isSucces: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
      isSucces: false,
    });
  }
};

export const handleLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isExistEmail = await userModel.findOne({ email });
    const isMatched = await bcrypt.compare(password, isExistEmail.password);

    if (!isExistEmail || !isMatched) {
      return next(new CustomError("Invalid email or password", 400));
    }

    const user = await userModel.findById(isExistEmail._id).select("-password");
    const payload = {
      id: user?._id,
      email: user?.email,
    };
    const { token } = await genToken(payload);

    return res.status(200).json({
      message: "User logged in successfully.",
      token,
      data: user,
      isSucces: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error.",
      isSucces: false,
    });
  }
};
