import { Response } from "express";

import Budget from "../models/budget.model";

import { AuthRequest } from "../middleware/auth.middleware";

export const createBudget =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const budget =
        await Budget.create({
          ...req.body,

          createdBy:
            req.user?.userId,
        });

      res.status(201).json({
        success: true,
        data: budget,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to create budget",
      });
    }
  };

export const getBudgets =
  async (
    _req: AuthRequest,
    res: Response
  ) => {
    try {
      const budgets =
        await Budget.find().sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        data: budgets,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch budgets",
      });
    }
  };