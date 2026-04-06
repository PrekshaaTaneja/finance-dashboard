import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  _req: Request,
  res: Response
) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("❌ Error:", error);

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};