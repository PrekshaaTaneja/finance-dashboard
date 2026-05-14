import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import AppRouter from "./routes/AppRouter";

import { Toaster } from "sonner";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>

    <ThemeProvider>

      <AuthProvider>

        <AppRouter />

        <Toaster
          position="top-right"
          richColors
        />

      </AuthProvider>

    </ThemeProvider>

  </React.StrictMode>
);