import { Response } from "express";

import Transaction from "../models/transaction.model.js";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const getDashboardSummary = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const summary =
      await Transaction.aggregate([
        {
          $match: {
            createdBy: new mongoose.Types.ObjectId(
              req.user?.userId
            ),
          },
        },
        {
          $group: {
            _id: "$type",
            total: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const income =
      summary.find(
        (item) =>
          item._id === "income"
      )?.total || 0;

    const expense =
      summary.find(
        (item) =>
          item._id === "expense"
      )?.total || 0;

    return res.status(200).json({
      success: true,
      data: {
        totalIncome: income,
        totalExpense: expense,
        netBalance:
          income - expense,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch dashboard summary",
    });
  }
};

export const getCategoryBreakdown =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const categories =
        await Transaction.aggregate([
          {
            $match: {
              createdBy: new mongoose.Types.ObjectId(
                req.user?.userId
              ),
            },
          },
          {
            $group: {
              _id: "$category",
              total: {
                $sum: "$amount",
              },
            },
          },
          {
            $sort: {
              total: -1,
            },
          },
        ]);

      return res.status(200).json({
        success: true,
        data: categories,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch category breakdown",
      });
    }
  };

export const getMonthlyTrend =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const trends =
        await Transaction.aggregate([
          {
            $match: {
              createdBy: new mongoose.Types.ObjectId(
                req.user?.userId
              ),
            },
          },
          {
            $group: {
              _id: {
                $month: "$date",
              },

              total: {
                $sum: "$amount",
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]);

        const formattedTrends = trends.map(
          (item) => ({
            month: item._id,
            total: item.total,
          })
        );

      return res.status(200).json({
        success: true,
        data: formattedTrends,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch monthly trends",
      });
    }
  };

export const getRecentTransactions =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const recent =
        await Transaction.find({
          createdBy:
            req.user!.userId,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      return res.status(200).json({
        success: true,
        data: recent,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch recent transactions",
      });
    }
  };

export const getAdvancedAnalytics =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const transactions =
        await Transaction.find({
          createdBy:
            req.user!.userId,
        });

      const totalTransactions =
        transactions.length;

      const totalIncome =
        transactions
          .filter(
            (t) =>
              t.type ===
              "income"
          )
          .reduce(
            (acc, curr) =>
              acc +
              curr.amount,
            0
          );

      const totalExpense =
        transactions
          .filter(
            (t) =>
              t.type ===
              "expense"
          )
          .reduce(
            (acc, curr) =>
              acc +
              curr.amount,
            0
          );

      const averageTransaction =
        totalTransactions > 0
          ? (
              (totalIncome +
                totalExpense) /
              totalTransactions
            ).toFixed(2)
          : 0;

      const categoryTotals:
        Record<
          string,
          number
        > = {};

      transactions.forEach(
        (t) => {
          if (
            t.type ===
            "expense"
          ) {
            categoryTotals[
              t.category
            ] =
              (categoryTotals[
                t.category
              ] || 0) +
              t.amount;
          }
        }
      );

      let topCategory =
        "No Expenses";

      let maxAmount = 0;

      for (const category in categoryTotals) {

        const amount =
          categoryTotals[
            category
          ] ?? 0;

        if (
          amount > maxAmount
        ) {
          maxAmount = amount;

          topCategory =
            category;
        }
      }

      const savingsRate =
        totalIncome > 0
          ? (
              ((totalIncome -
                totalExpense) /
                totalIncome) *
              100
            ).toFixed(1)
          : 0;

      res.status(200).json({
        success: true,

        data: {
          totalTransactions,

          averageTransaction,

          topCategory,

          savingsRate,

          incomeExpenseRatio:
            totalExpense > 0
              ? (
                  totalIncome /
                  totalExpense
                ).toFixed(2)
              : 0,
        },
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch analytics",
      });
    }
  };