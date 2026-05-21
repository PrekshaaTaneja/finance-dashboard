import { useState } from "react";

// import AddTransactionModal from "@/components/AddTransactionModal";
import TransactionTable from "@/components/TransactionTable";
import { Input } from "@/components/ui/input";

const TransactionsPage = () => {
  const [refresh] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("");

  // const triggerRefresh = () => {
  //   setRefresh((prev) => !prev);
  // };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Input
          placeholder="Search category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="h-11"
        />

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          className="
            h-11
            w-full
            rounded-md
            border
            border-input
            bg-background
            px-3
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-[#6C63FF]
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