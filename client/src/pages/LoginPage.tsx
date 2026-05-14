import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import api from "@/services/api";

import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {

  const navigate =
    useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin =
    async () => {
      try {
        setLoading(true);

        const res =
          await api.post(
            "/auth/login",
            form
          );

        login(
          res.data.token,
          res.data.user
        );

        toast.success(
          "Login successful"
        );

        navigate("/");

      } catch {
        toast.error(
          "Invalid credentials"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-100
        via-white
        to-indigo-100
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white/80
          backdrop-blur-xl
          shadow-2xl
          p-10
          border
          border-white/20
        "
      >
        {/* Logo */}
        <div className="text-center">

          <h1
            className="
              text-4xl
              font-bold
              text-slate-900
            "
          >
            Fin
            <span className="text-indigo-600">
              Sphere
            </span>
          </h1>

          <p
            className="
              text-slate-500
              mt-3
            "
          >
            Smart finance analytics platform
          </p>

        </div>

        {/* Form */}
        <div className="mt-10 space-y-5">

          <Input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="h-12"
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="h-12"
          />

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full
              h-12
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-base
            "
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </Button>

        </div>

        {/* Footer */}
        <p
          className="
            text-center
            text-sm
            text-slate-500
            mt-8
          "
        >
          Don&apos;t have an account?{" "}

          <Link
            to="/signup"
            className="
              text-indigo-600
              font-semibold
              hover:underline
            "
          >
            Create Account
          </Link>

        </p>
      </div>
    </div>
  );
};

export default LoginPage;