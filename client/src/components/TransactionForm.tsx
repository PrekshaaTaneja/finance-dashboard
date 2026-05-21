import {
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  transactionSchema,
  type TransactionFormData,
} from "@/validators/transaction.validator";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

interface Props {
  onSubmit: (
    data: TransactionFormData
  ) => void;

  loading?: boolean;
}

const TransactionForm = ({
  onSubmit,
  loading,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver:
      zodResolver(
        transactionSchema
      ),
  });

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >
      <div>
        <Input
          type="number"
          placeholder="Amount"
          {...register("amount", {
            valueAsNumber: true,
          })}
        />

        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">
            {
              errors.amount
                .message
            }
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Category"
          {...register(
            "category"
          )}
        />

        {errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {
              errors.category
                .message
            }
          </p>
        )}
      </div>

      <select
        {...register("type")}
        className="
          w-full
          h-12
          rounded-xl
          border
          px-4
        "
      >
        <option value="">
          Select Type
        </option>

        <option value="income">
          Income
        </option>

        <option value="expense">
          Expense
        </option>
      </select>

      <Input
        type="date"
        {...register("date")}
      />

      <Input
        placeholder="Notes"
        {...register("notes")}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Saving..."
          : "Save Transaction"}
      </Button>
    </form>
  );
};

export default TransactionForm;