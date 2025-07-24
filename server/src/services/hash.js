import bcrypt from "bcrypt";
import CustomError from "../utils/CustomError.js";

export const genHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    return {
      hashedPassword: hash,
      isSuccess: true,
    };
  } catch (error) {
    console.error(`Error while genrating hash password: ${error}`);

    return {
      hashedPassword: hash,
      isSuccess: true,
      error: new CustomError("Error while genrating hash password.", 500),
    };
  }
};
