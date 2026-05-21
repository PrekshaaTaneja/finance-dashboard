import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transaction.controller.js";
import {
  authorize,
  protect,
} from "../middleware/auth.middleware.js";

import { validate } from "../middleware/validate.middleware.js";
import { transactionSchema } from "../validators/transaction.validator.js";

const router = Router();

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Transactions fetched successfully
 */

router.get(
  "/",
  protect,
  authorize("viewer", "analyst", "admin"),
  getTransactions
);

router.post(
  "/",
  protect,
  authorize("admin", "analyst"),
  validate(transactionSchema),
  createTransaction
);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  validate(transactionSchema),
  updateTransaction
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteTransaction
);

export default router;