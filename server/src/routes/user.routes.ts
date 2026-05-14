import { Router } from "express";

import {
  createUser,
  getUsers,
  toggleUserStatus,
} from "../controllers/user.controller";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware";

const router = Router();

router.use(
  protect,
  authorize("admin")
);

router.get("/", getUsers);

router.post("/", createUser);

router.patch(
  "/:id/status",
  toggleUserStatus
);

export default router;