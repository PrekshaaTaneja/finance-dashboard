import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { toast } from "sonner";

import AppModal from "./AppModal";

import TransactionForm from "./TransactionForm";

import { createTransaction } from "@/services/transaction.service";

interface Props {
  onSuccess: () => void;
}

const AddTransactionModal = ({
  onSuccess,
}: Props) => {
  const [open, setOpen] =
    useState(false);

  const queryClient =
    useQueryClient();

  const mutation =
    useMutation({
      mutationFn:
        createTransaction,

      onSuccess: () => {
        toast.success(
          "Transaction created"
        );

        setOpen(false);

        queryClient.invalidateQueries({
          queryKey: ["transactions"],
        });

        onSuccess();
      },

      onError: () => {
        toast.error(
          "Failed to create transaction"
        );
      },
    });

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
        Add Transaction
      </button>

      <AppModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        title="Add Transaction"
      >
        <TransactionForm
          onSubmit={(
            data
          ) =>
            mutation.mutate(data)
          }
          loading={
            mutation.isPending
          }
        />
      </AppModal>
    </>
  );
};

export default AddTransactionModal;