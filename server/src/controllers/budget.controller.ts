import { Response } from "express";
import mongoose from "mongoose";

import Budget from "../models/budget.model.js";
import Transaction from "../models/transaction.model.js";

import { AuthRequest } from "../middleware/auth.middleware.js";

export const createBudget = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      category,
      limit,
      month,
    } = req.body;

    // prevent duplicate budget
    const existingBudget =
      await Budget.findOne({
        createdBy: req.user!.userId,
        category: category.toLowerCase(),
        month,
      });

    if (existingBudget) {
      return res.status(400).json({
        success: false,
        message:
          "Budget already exists for this category and month",
      });
    }

    const budget =
      await Budget.create({
        category:
          category.toLowerCase(),
        limit,
        month,
        createdBy:
          req.user!.userId,
      });

    return res.status(201).json({
      success: true,
      message:
        "Budget created successfully",
      data: budget,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to create budget",
    });
  }
};

export const getBudgets = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const budgets =
      await Budget.find({
        createdBy:
          req.user!.userId,
      }).sort({
        createdAt: -1,
      });

    const budgetsWithSpent =
      await Promise.all(
        budgets.map(
          async (budget) => {
            const startDate =
              new Date(
                `${budget.month}-01`
              );

            const endDate =
              new Date(startDate);

            endDate.setMonth(
              endDate.getMonth() + 1
            );

            const expenseResult =
              await Transaction.aggregate([
                {
                  $match: {
                    createdBy:
                      new mongoose.Types.ObjectId(
                        req.user?.userId
                      ),

                    type: "expense",

                    date: {
                      $gte:
                        startDate,

                      $lt: endDate,
                    },
                  },
                },

                {
                  $match: {
                    $expr: {
                      $eq: [
                        {
                          $toLower:
                            "$category",
                        },

                        budget.category,
                      ],
                    },
                  },
                },

                {
                  $group: {
                    _id: null,

                    total: {
                      $sum:
                        "$amount",
                    },
                  },
                },
              ]);

            const spent =
              expenseResult[0]
                ?.total || 0;

            return {
              ...budget.toObject(),
              spent,
            };
          }
        )
      );

    return res.status(200).json({
      success: true,
      data: budgetsWithSpent,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch budgets",
    });
  }
};