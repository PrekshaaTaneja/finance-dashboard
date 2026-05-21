import { Request, Response } from "express";
import Transaction from "../models/transaction.model.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
    });
  }
};

export const getTransactions =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 10;

      const skip =
        (page - 1) * limit;

      const search =
        (req.query.search as string) || "";

      const type =
        (req.query.type as string) || "";

      const sort =
        (req.query.sort as string) ||
        "-date";

      const query: any = {
        createdBy: req.user?.userId,
      };

      if (search) {
        query.category = {
          $regex: search,
          $options: "i",
        };
      }

      if (type) {
        query.type = type;
      }

      const transactions =
        await Transaction.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit);

      const total =
        await Transaction.countDocuments(
          query
        );

      res.status(200).json({
        success: true,
        data: {
          transactions,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(
              total / limit
            ),
          },
        },
      });
    }
  );

export const updateTransaction = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    delete req.body.createdBy;
    const transaction =
      await Transaction.findOneAndUpdate(
        {
          _id: req.params.id,
          createdBy:
            req.user!.userId,
        } as any,
        req.body,
        {
          new: true,
        }
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
    });
  }
};

export const deleteTransaction = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const transaction =
      await Transaction.findOneAndDelete(
        {
          _id: req.params.id,
          createdBy:
            req.user!.userId,
        } as any
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
    });
  }
};