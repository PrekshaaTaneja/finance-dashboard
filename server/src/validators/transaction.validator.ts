import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["income", "expense"]),
  category: z.string().min(2),
  date: z.string(),
  notes: z.string().optional(),
});