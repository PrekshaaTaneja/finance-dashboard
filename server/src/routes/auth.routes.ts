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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [viewer, analyst, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", validate(registerSchema), registerUser);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login successful
 */
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