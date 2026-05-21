
import { useQuery } from "@tanstack/react-query";

import KpiCard from "@/components/KpiCard";
import TrendChart from "@/components/TrendChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import RecentTransactions from "@/components/RecentTransactions";
import AnalyticsCard from "@/components/AnalyticsCard";
import FinancialInsights from "@/components/FinancialInsights";
import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import SkeletonCard from "@/components/SkeletonCard";

import FadeIn from "@/animations/FadeIn";

import {
  getDashboardSummary,
  getAdvancedAnalytics,
} from "@/services/dashboard.service";

import { queryKeys } from "@/lib/queryKeys";

import { formatCurrency } from "@/lib/formatters";

const DashboardPage = () => {
  const {
    data: summary,
    isLoading: summaryLoading,
  } = useQuery({
    queryKey:
      queryKeys.dashboardSummary,
    queryFn: getDashboardSummary,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: analytics,
    isLoading: analyticsLoading,
  } = useQuery({
    queryKey: queryKeys.analytics,
    queryFn: getAdvancedAnalytics,
    staleTime: 1000 * 60 * 5,
  });

  // 🔥 Loading State
  if (
    summaryLoading ||
    analyticsLoading
  ) {
    return (
      <div className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />

        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-5">

          <div className="xl:col-span-2">
            <SkeletonCard />
          </div>

          <SkeletonCard />

        </div>

      </div>
    );
  }

  return (
    <PageWrapper>

      <PageHeader
        title="Finance Dashboard"
        description="Track performance, trends and financial insights in real time."
      />

      {/* KPI Cards */}
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          <KpiCard
            title="Total Income"
            value={formatCurrency(
              summary?.totalIncome || 0
            )}
          />

          <KpiCard
            title="Expenses"
            value={formatCurrency(
              summary?.totalExpense || 0
            )}
          />

          <KpiCard
            title="Net Balance"
            value={formatCurrency(
              summary?.netBalance || 0
            )}
          />

        </div>
      </FadeIn>

      {/* Analytics */}
      <FadeIn delay={0.1}>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
            mt-5
          "
        >
          <AnalyticsCard
            title="Transactions"
            value={
              analytics?.totalTransactions ||
              0
            }
            subtitle="Total financial records"
          />

          <AnalyticsCard
            title="Average Transaction"
            value={formatCurrency(
              analytics?.averageTransaction ||
                0
            )}
            subtitle="Average transaction value"
          />

          <AnalyticsCard
            title="Top Category"
            value={
              analytics?.topCategory ||
              "-"
            }
            subtitle="Highest spending category"
          />

          <AnalyticsCard
            title="Savings Rate"
            value={`${
              analytics?.savingsRate ||
              0
            }%`}
            subtitle="Financial efficiency"
          />
        </div>

      </FadeIn>

      {/* Charts */}
      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          <div className="2xl:col-span-2 min-w-0">
            <TrendChart />
          </div>

          <div className="min-w-0">
            <CategoryPieChart />
          </div>

        </div>
      </FadeIn>

      {/* Insights */}
      <FadeIn delay={0.3}>
        {
          analytics && (
            <FinancialInsights
              analytics={analytics}
            />
          )
        }
      </FadeIn>

      {/* Recent */}
      <FadeIn delay={0.4}>
        <RecentTransactions />
      </FadeIn>

    </PageWrapper>
  );
};

export default DashboardPage;