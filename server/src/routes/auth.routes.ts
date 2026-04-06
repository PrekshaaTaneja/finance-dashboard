import { Router } from "express";
import {
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

import { validate } from "../middleware/validate.middleware";
import {
  loginSchema,
  registerSchema,
} from "../validators/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

router.get(
  "/admin-only",
  protect,
  authorize("admin"),
  (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

export default router;