import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRoutes);

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Finance Dashboard API is running",
  });
});

export default app;