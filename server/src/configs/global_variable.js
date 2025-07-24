import dotenv from "dotenv";
dotenv.config();

export const gv = {
  port: process.env.PORT,

  mongo_user: process.env.MONGO_USER,
  mongo_password: process.env.MONGO_PASSWORD,

  jwt_secret: process.env.JWT_SECRET,

  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secret: process.env.CLOUD_SECRET_KEY,
};
