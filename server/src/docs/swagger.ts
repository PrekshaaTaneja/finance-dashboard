import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard RBAC API",
      version: "1.0.0",
      description:
        "Professional finance dashboard backend with RBAC and analytics",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.ts")],
};

export const swaggerSpec = swaggerJsdoc(options);