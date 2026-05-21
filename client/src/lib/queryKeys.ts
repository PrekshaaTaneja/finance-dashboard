export const queryKeys = {
  dashboardSummary: ["dashboard-summary"],
  analytics: ["analytics"],
  transactions: (
    page: number,
    search: string,
    type: string
  ) => [
    "transactions",
    page,
    search,
    type,
  ],
  users: ["users"],
  budgets: ["budgets"],
};