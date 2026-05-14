import { useEffect, useState } from "react";

import KpiCard from "@/components/KpiCard";
import TrendChart from "@/components/TrendChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import RecentTransactions from "@/components/RecentTransactions";
import AnalyticsCard from "@/components/AnalyticsCard";
import FinancialInsights from "@/components/FinancialInsights";

import api from "@/services/api";

import PageHeader from "@/components/PageHeader";
import SkeletonCard from "@/components/SkeletonCard";

import FadeIn from "@/animations/FadeIn";

import type { AdvancedAnalytics } from "@/types/analytics";

const DashboardPage = () => {
  const [summary, setSummary] = useState<{
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
  } | null>(null);

  const [analytics, setAnalytics] =
    useState<AdvancedAnalytics | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get(
          "/dashboard/summary"
        );

        setSummary(res.data.data);

        const analyticsRes =
          await api.get(
            "/dashboard/advanced-analytics"
          );

        setAnalytics(
          analyticsRes.data.data
        );

      } catch (error) {
        console.error(
          "Failed to fetch dashboard data",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  // 🔥 Loading State
  if (loading) {
    return (
      <div className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          <div className="xl:col-span-2">
            <SkeletonCard />
          </div>

          <SkeletonCard />

        </div>

      </div>
    );
  }

  return (
    <div className="w-full space-y-8">

      <PageHeader
        title="Finance Dashboard"
        description="Track performance, trends and financial insights in real time."
      />

      {/* KPI Cards */}
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          <KpiCard
            title="Total Income"
            value={`₹${summary?.totalIncome || 0}`}
          />

          <KpiCard
            title="Expenses"
            value={`₹${summary?.totalExpense || 0}`}
          />

          <KpiCard
            title="Net Balance"
            value={`₹${summary?.netBalance || 0}`}
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
            value={`₹${
              analytics?.averageTransaction ||
              0
            }`}
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

          <div className="lg:col-span-2">
            <TrendChart />
          </div>

          <CategoryPieChart />

        </div>
      </FadeIn>

      {/* Insights */}
      <FadeIn delay={0.3}>
        <FinancialInsights
          analytics={
            analytics as AdvancedAnalytics
          }
        />
      </FadeIn>

      {/* Recent */}
      <FadeIn delay={0.4}>
        <RecentTransactions />
      </FadeIn>

    </div>
  );
};

export default DashboardPage;