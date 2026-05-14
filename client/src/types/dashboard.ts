export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface TrendData {
  month: number;
  total: number;
}

export interface CategoryData {
  _id: string;
  total: number;
}

export interface RecentTransaction {
  _id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}