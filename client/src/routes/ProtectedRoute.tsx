import { Navigate } from "react-router-dom";
import Loader from "@/components/Loader";

import {
  type ReactNode,
} from "react";

import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({
  children,
}: {
  children: ReactNode;
}) => {

  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!token || token === "undefined") {
    return (
      <Navigate to="/login" />
    );
  }

  return children;
};

export default ProtectedRoute;