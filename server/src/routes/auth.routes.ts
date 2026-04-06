import { Router } from "express";
import {
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

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