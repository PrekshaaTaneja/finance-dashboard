import { Router } from "express";
import {
  getCategoryBreakdown,
  getDashboardSummary,
  getMonthlyTrend,
  getRecentTransactions,
  getAdvancedAnalytics,
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

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 */

router.get("/summary", getDashboardSummary);
router.get("/categories", getCategoryBreakdown);
router.get("/trends", getMonthlyTrend);
router.get("/recent", getRecentTransactions);
router.get(
  "/advanced-analytics",
  getAdvancedAnalytics
);
export default router;