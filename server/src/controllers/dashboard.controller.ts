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
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id": 1 },
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