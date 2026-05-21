import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { budgetSchema } from "../validators/budget.validator.js";

import {
  createBudget,
  getBudgets,
} from "../controllers/budget.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

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
  validate(budgetSchema),
  createBudget
);

export default router;