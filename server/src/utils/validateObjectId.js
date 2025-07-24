import { Types } from "mongoose";

const isValidObjectId = (id) => {
  return Types.ObjectId.isValid(id);
};

export default isValidObjectId;
