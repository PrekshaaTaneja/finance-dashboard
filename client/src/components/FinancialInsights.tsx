import type { AdvancedAnalytics } from "@/types/analytics";

interface Props {
  analytics: AdvancedAnalytics;
}

const FinancialInsights = ({
  analytics,
}: Props) => {
  return (
    <div
      className="
        rounded-3xl
        bg-gradient-to-br
        from-indigo-500
        to-violet-600
        text-white
        p-8
        shadow-xl
      "
    >
      <h2
        className="
          text-2xl
          font-bold
        "
      >
        Financial Insights
      </h2>

      <p
        className="
          text-indigo-100
          mt-2
        "
      >
        AI-inspired financial overview
      </p>

      <div className="mt-8 space-y-5">

        <div
          className="
            flex
            justify-between
            items-center
          "
        >
          <span className="text-indigo-100">
            Savings Rate
          </span>

          <span className="font-bold text-lg">
            {analytics.savingsRate}%
          </span>
        </div>

        <div
          className="
            flex
            justify-between
            items-center
          "
        >
          <span className="text-indigo-100">
            Expense Ratio
          </span>

          <span className="font-bold text-lg">
            {
              analytics.incomeExpenseRatio
            }
          </span>
        </div>

        <div
          className="
            flex
            justify-between
            items-center
          "
        >
          <span className="text-indigo-100">
            Top Expense Category
          </span>

          <span
            className="
              font-bold
              capitalize
            "
          >
            {analytics.topCategory}
          </span>
        </div>

      </div>
    </div>
  );
};

export default FinancialInsights;