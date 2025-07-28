import { Schema, model } from "mongoose";

const walletSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    total_income: {
      type: Number,
      default: 0,
    },
    total_expenses: {
      type: Number,
      default: 0,
    },
    avatar: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const walletModel = model("wallet", walletSchema);
export default walletModel;
