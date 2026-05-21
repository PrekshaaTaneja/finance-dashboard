export interface Transaction {
  _id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  notes?: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}