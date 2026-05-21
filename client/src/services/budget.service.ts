import api from "./api";

export const getBudgets =
  async () => {
    const res = await api.get(
      "/budgets"
    );

    return res.data.data;
  };

export const createBudget =
  async (data: {
    category: string;
    limit: number;
    month: string;
  }) => {
    const res = await api.post(
      "/budgets",
      data
    );

    return res.data.data;
  };