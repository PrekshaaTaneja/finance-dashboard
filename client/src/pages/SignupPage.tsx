import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import api from "@/services/api";

const SignupPage = () => {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSignup =
    async () => {
      try {
        setLoading(true);

        await api.post(
          "/auth/register",
          form
        );

        toast.success(
          "Account created successfully"
        );

        navigate("/login");

      } catch {
        toast.error(
          "Signup failed"
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
            Create Account
          </h1>

          <p
            className="
              text-slate-500
              mt-3
            "
          >
            Join FinSphere platform
          </p>

        </div>

        {/* Form */}
        <div className="mt-10 space-y-5">

          <Input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="h-12"
          />

          <Input
            name="email"
            type="email"
            placeholder="Email Address"
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

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="
              w-full
              h-12
              rounded-xl
              border
              border-slate-200
              px-4
              text-sm
            "
          >
            <option value="viewer">
              Viewer
            </option>

            <option value="analyst">
              Analyst
            </option>
          </select>

          <Button
            onClick={handleSignup}
            disabled={loading}
            className="
              w-full
              h-12
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
            "
          >
            {loading
              ? "Creating..."
              : "Create Account"}
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
          Already have an account?{" "}

          <Link
            to="/login"
            className="
              text-indigo-600
              font-semibold
              hover:underline
            "
          >
            Login
          </Link>

        </p>
      </div>
    </div>
  );
};

export default SignupPage;