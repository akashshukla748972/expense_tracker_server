import { v2 as cloudinary } from "cloudinary";
import { gv } from "./global_variable.js";

const connectToCloudinary = () => {
  cloudinary.config({
    cloud_name: gv.cloud_name,
    api_key: gv.cloud_api_key,
    api_secret: gv.cloud_api_secret,
  });
};

export default connectToCloudinary;
