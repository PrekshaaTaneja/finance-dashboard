import { Router } from "express";

import {
  createBudget,
  getBudgets,
} from "../controllers/budget.controller";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware";

const router = Router();

router.use(
  protect,
  authorize(
    "admin",
    "analyst",
    "viewer"
  )
);

router.get("/", getBudgets);

router.post(
  "/",
  authorize(
    "admin",
    "analyst"
  ),
  createBudget
);

export default router;