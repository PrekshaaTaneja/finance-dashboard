import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import api from "@/services/api";

import { toast } from "sonner";

import { Pencil } from "lucide-react";

interface Transaction {
  _id: string;

  amount: number;

  category: string;

  type: "income" | "expense";

  date: string;

  notes?: string;
}

interface Props {
  transaction: Transaction;

  onSuccess: () => void;
}

const EditTransactionModal = ({
  transaction,
  onSuccess,
}: Props) => {

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      amount:
        transaction.amount.toString(),

      category:
        transaction.category,

      type:
        transaction.type,

      date:
        transaction.date
          .split("T")[0],

      notes:
        transaction.notes || "",
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

  const handleUpdate =
    async () => {
      try {
        setLoading(true);

        await api.patch(
          `/transactions/${transaction._id}`,
          {
            ...form,
            amount:
              Number(form.amount),
          }
        );

        toast.success(
          "Transaction updated"
        );

        setOpen(false);

        onSuccess();

      } catch {
        toast.error(
          "Update failed"
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

        <button
          className="
            text-indigo-600
            hover:text-indigo-800
          "
        >
          <Pencil size={18} />
        </button>

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
            Edit Transaction
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          <Input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            className="h-12"
          />

          <Input
            name="category"
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
            "
          >
            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>
          </select>

          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="h-12"
          />

          <Input
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="h-12"
          />

          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="
              w-full
              h-12
              rounded-xl
            "
          >
            {loading
              ? "Updating..."
              : "Update Transaction"}
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionModal;