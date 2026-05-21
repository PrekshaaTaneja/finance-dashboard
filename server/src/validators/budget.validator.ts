import { z } from "zod";

export const budgetSchema =
  z.object({
    category:
      z.string().min(2),

    limit:
      z.number().positive(),

    month:
      z.string().min(7),
  });