import { Request, Response } from "express";
import Transaction from "../models/transaction.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const createTransaction = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      createdBy: req.user?.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
      error,
    });
  }
};

export const getTransactions = async (
  req: Request,
  res: Response
) => {
  try {
    const {
        type,
        category,
        page = 1,
        limit = 8,
    } = req.query;

    const filters: any = {};

    if (type) filters.type = type;
    if (category) {
      filters.category = {
        $regex: category,
        $options: "i",
      };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const transactions = await Transaction.find(filters)
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(filters);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error,
    });
  }
};

export const updateTransaction = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update transaction",
      error,
    });
  }
};

export const deleteTransaction = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete transaction",
      error,
    });
  }
};