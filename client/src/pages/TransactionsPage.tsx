import { useState } from "react";

import AddTransactionModal from "@/components/AddTransactionModal";
import TransactionTable from "@/components/TransactionTable";
import { Input } from "@/components/ui/input";

const TransactionsPage = () => {
  const [refresh, setRefresh] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("");

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and review all financial records.
          </p>
        </div>

        <AddTransactionModal
          onSuccess={triggerRefresh}
        />

      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Input
          placeholder="Search category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          className="
            h-10
            rounded-md
            border
            border-input
            bg-background
            px-3
            py-2
            text-sm
          "
        >
          <option value="">
            All Types
          </option>

          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>

      </div>

      {/* Table */}
      <TransactionTable
        refresh={refresh}
        search={search}
        type={type}
      />

    </div>
  );
};

export default TransactionsPage;