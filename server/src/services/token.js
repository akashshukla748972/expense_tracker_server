import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";
import { gv } from "../configs/global_variable.js";

export const genToken = async (payload = null) => {
  try {
    if (!payload) {
      return {
        isSuccess: false,
        error: new CustomError("Bad request token payload is required.", 400),
      };
    }
    const token = await jwt.sign(payload, gv.jwt_secret);

    return {
      token,
      isSuccess: true,
    };
  } catch (error) {
    console.error(`Error while genrating hash password: ${error}`);

    return {
      isSuccess: false,
      error: new CustomError("Error while genrating hash password.", 500),
    };
  }
};
