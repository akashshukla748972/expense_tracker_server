import mongoose from "mongoose";
import { gv } from "./global_variable.js";

export const connectToDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${gv.mongo_user}:${gv.mongo_password}@cluster0.fu3kkvn.mongodb.net/`
    );
    console.log("database connected successfully.");
  } catch (error) {
    console.error(`Error while connecting to database: ${error}`);
    process.exit(1);
  }
};
