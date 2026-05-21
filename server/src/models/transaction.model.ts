import mongoose, { Schema, Document } from "mongoose";

export type TransactionType = "income" | "expense";

export interface ITransaction extends Document {
  amount: number;
  type: TransactionType;
  category: string;
  date: Date;
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: (v: number) => v > 0,
        message: "Amount must be positive",
      },
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

transactionSchema.index({
  createdBy: 1,
  date: -1,
});

export default mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);