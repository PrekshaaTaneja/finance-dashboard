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