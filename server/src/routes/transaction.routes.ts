import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transaction.controller";
import {
  authorize,
  protect,
} from "../middleware/auth.middleware";

import { validate } from "../middleware/validate.middleware";
import { transactionSchema } from "../validators/transaction.validator";

const router = Router();

router.get(
  "/",
  protect,
  authorize("viewer", "analyst", "admin"),
  getTransactions
);

router.post(
  "/",
  protect,
  authorize("admin"),
  validate(transactionSchema),
  createTransaction
);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  updateTransaction
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteTransaction
);

export default router;