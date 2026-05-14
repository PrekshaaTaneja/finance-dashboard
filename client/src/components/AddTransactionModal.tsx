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

import api from "@/services/api";

import { toast } from "sonner";

const AddTransactionModal = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !form.amount ||
      !form.category ||
      !form.date
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/transactions", {
        ...form,
        amount: Number(form.amount),
      });

      toast.success(
        "Transaction added successfully"
      );

      setForm({
        amount: "",
        category: "",
        type: "expense",
        date: "",
        notes: "",
      });

      setOpen(false);

      onSuccess();

    } catch (error) {
      toast.error(
        "Failed to add transaction"
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
          Add Transaction
        </Button>

      </DialogTrigger>

      <DialogContent
        className="
          rounded-3xl
          border-0
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
            Add Transaction
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          <Input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="h-12"
          />

          <Input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="h-12"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="
              w-full
              h-12
              rounded-xl
              border
              border-slate-200
              px-4
              text-sm
              outline-none
            "
          >
            <option value="expense">
              Expense
            </option>

            <option value="income">
              Income
            </option>
          </select>

          <Input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="h-12"
          />

          <Input
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="h-12"
          />

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
              ? "Saving..."
              : "Save Transaction"}
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;