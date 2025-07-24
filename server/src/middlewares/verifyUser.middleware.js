import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";
import { gv } from "../configs/global_variable.js";

const verifyUserMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(new CustomError("Unauthorized: No token provided", 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, gv.jwt_secret);
    req.user = decode;
    next();
  } catch (error) {
    console.error(`Error decoding token: ${error}`);
    return next(new CustomError("Invalid or expired token", 401));
  }
};

export default verifyUserMiddleware;
