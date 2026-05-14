import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IBudget
  extends Document {
  category: string;

  limit: number;

  spent: number;

  month: string;

  createdBy:
    mongoose.Types.ObjectId;
}

const budgetSchema =
  new Schema<IBudget>(
    {
      category: {
        type: String,
        required: true,
        trim: true,
      },

      limit: {
        type: Number,
        required: true,
      },

      spent: {
        type: Number,
        default: 0,
      },

      month: {
        type: String,
        required: true,
      },

      createdBy: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  );

export default mongoose.model<IBudget>(
  "Budget",
  budgetSchema
);