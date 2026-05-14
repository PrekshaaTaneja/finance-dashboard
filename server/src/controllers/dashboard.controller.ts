import { Response } from "express";
import Transaction from "../models/transaction.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const getDashboardSummary = async (
  _req: AuthRequest,
  res: Response
) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const income =
      summary.find((item) => item._id === "income")?.total || 0;
    const expense =
      summary.find((item) => item._id === "expense")?.total || 0;

    return res.status(200).json({
      success: true,
      data: {
        totalIncome: income,
        totalExpense: expense,
        netBalance: income - expense,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary",
      error,
    });
  }
};

export const getCategoryBreakdown = async (
  _req: AuthRequest,
  res: Response
) => {
  try {
    const categories = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch category breakdown",
      error,
    });
  }
};

export const getMonthlyTrend = async (
  _req: AuthRequest,
  res: Response
) => {
  try { 
    const trends = await Transaction.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: trends,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch monthly trends",
      error,
    });
  }
};

export const getRecentTransactions = async (
  _req: AuthRequest,
  res: Response
) => {
  try {
    const recent = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: recent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent transactions",
      error,
    });
  }
};

export const getAdvancedAnalytics =
  async (
    _req: AuthRequest,
    res: Response
  ) => {
    try {
      const transactions =
        await Transaction.find();

      const totalTransactions =
        transactions.length;

      const totalIncome =
        transactions
          .filter(
            (t) =>
              t.type === "income"
          )
          .reduce(
            (acc, curr) =>
              acc + curr.amount,
            0
          );

      const totalExpense =
        transactions
          .filter(
            (t) =>
              t.type === "expense"
          )
          .reduce(
            (acc, curr) =>
              acc + curr.amount,
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
        Record<string, number> =
        {};

      transactions.forEach((t) => {
        if (t.type === "expense") {
          categoryTotals[
            t.category
          ] =
            (categoryTotals[
              t.category
            ] || 0) + t.amount;
        }
      });

      let topCategory =
        "No Expenses";

      let maxAmount = 0;

      for (const category in categoryTotals) {

        const amount =
          categoryTotals[category] ?? 0;

        if (amount > maxAmount) {

          maxAmount = amount;

          topCategory = category;
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