import api from "./api";

export const getDashboardSummary =
  async () => {
    const res = await api.get(
      "/dashboard/summary"
    );

    return res.data.data;
  };

export const getAdvancedAnalytics =
  async () => {
    const res = await api.get(
      "/dashboard/advanced-analytics"
    );

    return res.data.data;
  };