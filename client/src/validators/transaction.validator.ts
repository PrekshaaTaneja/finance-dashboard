import { z } from "zod";

export const transactionSchema =
  z.object({
    amount: z.number().positive(),
    category: z.string().min(2),
    type: z.enum([
      "income",
      "expense",
    ]),
    date: z.string(),
    notes: z.string().optional(),
  });

export type TransactionFormData =
  z.infer<
    typeof transactionSchema
  >;