import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import api from "@/services/api";

const AddUserModal = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {

  const [open, setOpen] =
    useState(false);

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

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        await api.post(
          "/users",
          form
        );

        toast.success(
          "User created successfully"
        );

        setOpen(false);

        onSuccess();

      } catch {
        toast.error(
          "Failed to create user"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>

        <Button
          className="
            bg-indigo-600
            hover:bg-indigo-700
            rounded-xl
            h-11
            px-5
          "
        >
          Add User
        </Button>

      </DialogTrigger>

      <DialogContent
        className="
          rounded-3xl
          p-8
        "
      >
        <DialogHeader>
          <DialogTitle
            className="
              text-2xl
              font-bold
            "
          >
            Create User
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

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

            <option value="admin">
              Admin
            </option>
          </select>

          <Button
            onClick={handleSubmit}
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
              : "Create User"}
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;