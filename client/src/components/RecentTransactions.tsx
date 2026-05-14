import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const transactions = [
  {
    title: "Salary",
    amount: "₹50,000",
    type: "income",
  },
  {
    title: "Rent",
    amount: "₹10,000",
    type: "expense",
  },
  {
    title: "Food",
    amount: "₹5,000",
    type: "expense",
  },
];

const RecentTransactions = () => {
  return (
    <Card
      className="
        border-0
        rounded-3xl
        bg-white/80
        backdrop-blur-xl
        shadow-md
      "
    >
      <CardContent className="p-6">

        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800">
            Recent Transactions
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Latest financial activities.
          </p>
        </div>

        <div className="space-y-4">

          {transactions.map((tx) => (
            <div
              key={tx.title}
              className="
                flex
                items-center
                justify-between
                p-4
                rounded-2xl
                hover:bg-slate-50
                transition
              "
            >
              <div className="flex items-center gap-4">

                <div
                  className={`
                    w-12
                    h-12
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    ${
                      tx.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }
                  `}
                >
                  {tx.type === "income" ? (
                    <ArrowUpRight />
                  ) : (
                    <ArrowDownLeft />
                  )}
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {tx.title}
                  </p>

                  <p className="text-sm text-slate-500">
                    {tx.type}
                  </p>
                </div>

              </div>

              <p
                className={`
                  font-bold
                  ${
                    tx.type === "income"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                `}
              >
                {tx.amount}
              </p>

            </div>
          ))}

        </div>

      </CardContent>
    </Card>
  );
};

export default RecentTransactions;