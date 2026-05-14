import {
  ArrowDown,
  ArrowUp,
  Wallet,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  value: string;
}

const KpiCard = ({ title, value }: Props) => {

  const isIncome = title === "Total Income";
  const isExpense = title === "Expenses";

  return (
    <Card
      className="
        relative
        overflow-hidden
        border-0
        rounded-3xl
        bg-white/80
        backdrop-blur-xl
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-300
        hover:-translate-y-1 hover:scale-[1.02]
      "
    >
      {/* Gradient Background */}
      <div
        className={`
          absolute
          inset-0
          opacity-10
          ${
            isIncome
              ? "bg-gradient-to-br from-green-400 to-emerald-500"
              : isExpense
              ? "bg-gradient-to-br from-red-400 to-rose-500"
              : "bg-gradient-to-br from-indigo-400 to-violet-500"
          }
        `}
      />

      <CardContent className="relative p-5">

        {/* Top */}
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>

            <h2 className="text-3xl font-bold mt-3 text-slate-800">
              {value}
            </h2>
          </div>

          {/* Icon */}
          <div
            className={`
              w-12
              h-12
              rounded-2xl
              flex
              items-center
              justify-center
              shadow-lg
              ${
                isIncome
                  ? "bg-green-100 text-green-600"
                  : isExpense
                  ? "bg-red-100 text-red-500"
                  : "bg-indigo-100 text-indigo-600"
              }
            `}
          >
            {isIncome ? (
              <ArrowUp size={28} />
            ) : isExpense ? (
              <ArrowDown size={28} />
            ) : (
              <Wallet size={28} />
            )}
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center gap-2">
          <div
            className={`
              h-2
              flex-1
              rounded-full
              ${
                isIncome
                  ? "bg-green-500"
                  : isExpense
                  ? "bg-red-500"
                  : "bg-indigo-500"
              }
            `}
          />

          <span className="text-xs text-slate-400">
            Updated recently
          </span>
        </div>

      </CardContent>
    </Card>
  );
};

export default KpiCard;