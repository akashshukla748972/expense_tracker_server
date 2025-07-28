import { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      default: "income",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    walletId: {
      type: Schema.Types.ObjectId,
      ref: "wallet",
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
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

const TransactionModel = model("transaction", TransactionSchema);
export default TransactionModel;
