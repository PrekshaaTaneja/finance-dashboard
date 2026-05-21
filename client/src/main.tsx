import React from "react";
import ReactDOM from "react-dom/client";

import {
  QueryClientProvider,
} from "@tanstack/react-query";

import "./index.css";

import AppRouter from "./routes/AppRouter";

import { Toaster } from "sonner";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { queryClient } from "./lib/react-query";



ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
      <ThemeProvider>

      <AuthProvider>

        <AppRouter />

        <Toaster
          position="top-right"
          richColors
        />

      </AuthProvider>

    </ThemeProvider>
    </QueryClientProvider>

  </React.StrictMode>
);