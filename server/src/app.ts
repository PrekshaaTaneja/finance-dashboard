import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./routes/auth.routes";
import transactionRoutes from "./routes/transaction.routes";
import dashboardRoutes from "./routes/dashboard.routes";

import { swaggerSpec } from "./docs/swagger";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middleware/error.middleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

/* ✅ Health route */
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Finance Dashboard API is running",
  });
});

/* ✅ Swagger MUST come before notFound */
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/* ✅ Main routes */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

/* ✅ ALWAYS keep these last */
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;