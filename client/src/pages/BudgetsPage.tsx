import { useEffect, useState } from "react";

import BudgetCard from "@/components/BudgetCard";

import EmptyState from "@/components/EmptyState";

import AddBudgetModal from "@/components/AddBudgetModal";

import { getBudgets } from "@/services/budget.service";

import type { Budget } from "@/types/budget";

const BudgetsPage = () => {

  const [budgets, setBudgets] =
    useState<Budget[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refresh, setRefresh] =
    useState(false);

  const fetchBudgets =
    async () => {
      try {
        setLoading(true);

        const data =
          await getBudgets();

        setBudgets(data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchBudgets();
  }, [refresh]);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading budgets...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Budgets
          </h1>

          <p className="text-slate-500 mt-1">
            Track spending limits and monitor budget performance.
          </p>
        </div>

        <AddBudgetModal
          onSuccess={triggerRefresh}
        />

      </div>

      {budgets.length === 0 ? (
        <EmptyState
          title="No budgets created yet"
          description="Create category budgets to track monthly spending."
        />
      ) : (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-5
          "
        >
          {budgets.map(
            (budget) => (
              <BudgetCard
                key={budget._id}
                budget={budget}
              />
            )
          )}
        </div>
      )}

    </div>
  );
};

export default BudgetsPage;