import type { Budget } from "@/types/budget";

interface Props {
  budget: Budget;
}

const BudgetCard = ({
  budget,
}: Props) => {

  const percentage =
    (budget.spent / budget.limit) *
    100;

  const isOverspent =
    percentage >= 100;

  return (
    <div
      className="
        rounded-3xl
        bg-white/80
        backdrop-blur-xl
        shadow-md
        p-6
      "
    >
      {/* Top */}
      <div
        className="
          flex
          items-start
          justify-between
        "
      >
        <div>

          <h3
            className="
              text-lg
              font-bold
              capitalize
              text-slate-800
            "
          >
            {budget.category}
          </h3>

          <p
            className="
              text-sm
              text-slate-500
              mt-1
            "
          >
            {budget.month}
          </p>

        </div>

        <div
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            ${
              isOverspent
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }
          `}
        >
          {Math.min(
            Math.round(percentage),
            100
          )}
          %
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">

        <div
          className="
            flex
            justify-between
            text-sm
            mb-2
          "
        >
          <span className="text-slate-500">
            Spent
          </span>

          <span className="font-semibold">
            ₹{budget.spent} / ₹
            {budget.limit}
          </span>
        </div>

        <div
          className="
            h-3
            rounded-full
            bg-slate-100
            overflow-hidden
          "
        >
          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-500
              ${
                isOverspent
                  ? "bg-red-500"
                  : "bg-indigo-500"
              }
            `}
            style={{
              width: `${Math.min(
                percentage,
                100
              )}%`,
            }}
          />
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-5">

        {isOverspent ? (
          <p
            className="
              text-sm
              text-red-500
              font-medium
            "
          >
            Budget limit exceeded
          </p>
        ) : (
          <p
            className="
              text-sm
              text-green-600
              font-medium
            "
          >
            Budget on track
          </p>
        )}

      </div>
    </div>
  );
};

export default BudgetCard;