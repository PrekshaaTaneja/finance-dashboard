import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import {
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import api from "@/services/api";

import { toast } from "sonner";

import EditTransactionModal from "./EditTransactionModal";

import { CSVLink } from "react-csv";

import { useTransactions } from "@/hooks/useTransactions";

import { queryKeys } from "@/lib/queryKeys";

interface Transaction {
  _id: string;

  category: string;

  amount: number;

  type: "income" | "expense";

  date: string;

  notes?: string;
}

interface Props {
  refresh: boolean;

  search: string;

  type: string;
}

const TransactionTable = ({
  refresh,
  search,
  type,
}: Props) => {

  const [page, setPage] =
    useState(1);

  const queryClient =
    useQueryClient();

  const {
    data,
    isLoading,
  } = useTransactions({
    page,
    search,
    type,
  });

  useEffect(() => {
    setPage(1);
  }, [search, type]);

  const handleDelete =
    async (id: string) => {
      try {
        await api.delete(
          `/transactions/${id}`
        );

        toast.success(
          "Transaction deleted"
        );

        queryClient.invalidateQueries({
          queryKey: ["transactions"],
        });

      } catch {
        toast.error(
          "Delete failed"
        );
      }
    };

  if (isLoading) {
    return (
      <div
        className="
          flex
          justify-center
          py-20
        "
      >
        <div
          className="
            w-10
            h-10
            border-4
            border-indigo-500
            border-t-transparent
            rounded-full
            animate-spin
          "
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* Top Controls */}
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-slate-800
          "
        >
          Transactions
        </h2>

        <CSVLink
          data={
            data?.transactions || []
          }
          filename="transactions.csv"
          className="
            bg-indigo-600
            text-white
            px-4
            py-2
            rounded-xl
            text-sm
            font-medium
            hover:bg-indigo-700
            transition
          "
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Table */}
      <div
        className="
          overflow-x-auto
          rounded-3xl
          bg-white/80
          backdrop-blur-xl
          shadow-md
          overflow-hidden
        "
      >
        <Table>

          <TableHeader>
            <TableRow>

              <TableHead>
                Category
              </TableHead>

              <TableHead>
                Amount
              </TableHead>

              <TableHead>
                Type
              </TableHead>

              <TableHead>
                Date
              </TableHead>

              <TableHead>
                Notes
              </TableHead>

              <TableHead>
                Actions
              </TableHead>

            </TableRow>
          </TableHeader>

          <TableBody>

            {data?.transactions.map(
              (tx:any) => (
                <TableRow
                  key={tx._id}
                >
                  <TableCell className="font-medium capitalize">
                    {tx.category}
                  </TableCell>

                  <TableCell className="font-semibold">
                    ₹{tx.amount}
                  </TableCell>

                  <TableCell>

                    <Badge
                      className={
                        tx.type ===
                        "income"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {tx.type}
                    </Badge>

                  </TableCell>

                  <TableCell>
                    {new Date(
                      tx.date
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    {tx.notes || "-"}
                  </TableCell>

                  <TableCell>

                    <div className="flex items-center gap-4">

                      <EditTransactionModal
                        transaction={
                          tx
                        }
                        onSuccess={() =>
                          queryClient.invalidateQueries({
                            queryKey:
                              queryKeys.transactions(
                                page,
                                search,
                                type
                              ),
                          })
                        }
                      />

                      <button
                        onClick={() =>
                          handleDelete(
                            tx._id
                          )
                        }
                        className="
                          text-red-500
                          hover:text-red-700
                        "
                      >
                        <Trash2
                          size={18}
                        />
                      </button>

                    </div>

                  </TableCell>

                </TableRow>
              )
            )}

          </TableBody>

        </Table>
      </div>

      {/* Pagination */}
      <div
        className="
          flex
          justify-center
          items-center
          gap-3
        "
      >
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(
              (prev) => prev - 1
            )
          }
          className="
            px-4
            py-2
            rounded-xl
            border
            bg-white
            disabled:opacity-50
          "
        >
          Previous
        </button>

        <div
          className="
            text-sm
            font-medium
          "
        >
          Page {page} of{" "}
          {data?.pagination
            .pages || 1}
        </div>

        <button
          disabled={
            page ===
            (data?.pagination
              .pages || 1)
          }
          onClick={() =>
            setPage(
              (prev) => prev + 1
            )
          }
          className="
            px-4
            py-2
            rounded-xl
            border
            bg-white
            disabled:opacity-50
          "
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default TransactionTable;