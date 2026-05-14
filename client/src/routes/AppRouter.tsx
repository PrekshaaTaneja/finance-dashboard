import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "@/layout/DashboardLayout";

import DashboardPage from "@/pages/DashboardPage";

import TransactionsPage from "@/pages/TransactionsPage";

import UsersPage from "@/pages/UsersPage";

import BudgetsPage from "@/pages/BudgetsPage";

import LoginPage from "@/pages/LoginPage";

import SignupPage from "@/pages/SignupPage";

import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<DashboardPage />}
          />

          <Route
            path="transactions"
            element={
              <TransactionsPage />
            }
          />

          <Route
            path="users"
            element={<UsersPage />}
          />

          <Route
            path="budgets"
            element={<BudgetsPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRouter;