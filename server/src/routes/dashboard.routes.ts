import { Router } from "express";
import {
  getCategoryBreakdown,
  getDashboardSummary,
  getMonthlyTrend,
  getRecentTransactions,
} from "../controllers/dashboard.controller";
import {
  authorize,
  protect,
} from "../middleware/auth.middleware";

const router = Router();

router.use(
  protect,
  authorize("viewer", "analyst", "admin")
);

router.get("/summary", getDashboardSummary);
router.get("/categories", getCategoryBreakdown);
router.get("/trends", getMonthlyTrend);
router.get("/recent", getRecentTransactions);

export default router;