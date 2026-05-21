import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["income", "expense"]),
  category: z.string().min(2),
  date: z.string().min(1),
  notes: z.string().optional(),
});