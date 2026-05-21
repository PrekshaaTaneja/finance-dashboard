import { useState } from "react";

import { toast } from "sonner";

import AppModal from "./AppModal";

import { createBudget } from "@/services/budget.service";

interface Props {
  onSuccess: () => void;
}

const AddBudgetModal = ({
  onSuccess,
}: Props) => {

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      category: "",
      limit: "",
      month: "",
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

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        await createBudget({
          category:
            form.category,

          limit:
            Number(form.limit),

          month:
            form.month,
        });

        toast.success(
          "Budget created successfully"
        );

        setOpen(false);

        onSuccess();

      } catch (error: any) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to create budget"
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
        className="
          bg-indigo-600
          text-white
          px-5
          py-3
          rounded-2xl
        "
      >
        Add Budget
      </button>

      <AppModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        title="Create Budget"
      >
        <div className="space-y-4">

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
            "
          />

          <input
            type="number"
            name="limit"
            placeholder="Budget Limit"
            value={form.limit}
            onChange={handleChange}
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
            "
          />

          <input
            type="month"
            name="month"
            value={form.month}
            onChange={handleChange}
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
            "
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full
              h-12
              rounded-xl
              bg-indigo-600
              text-white
            "
          >
            {loading
              ? "Creating..."
              : "Create Budget"}
          </button>

        </div>
      </AppModal>
    </>
  );
};

export default AddBudgetModal;