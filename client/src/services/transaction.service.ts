import api from "./api";
import type {
  TransactionFormData,
} from "@/validators/transaction.validator";

interface Params {
  page: number;
  search: string;
  type: string;
}

export const getTransactions =
  async ({
    page,
    search,
    type,
  }: Params) => {
    const res = await api.get(
      "/transactions",
      {
        params: {
          page,
          limit: 10,
          search,
          type,
        },
      }
    );

    return res.data.data;
  };


export const createTransaction =
  async (
    data: TransactionFormData
  ) => {
    const res = await api.post(
      "/transactions",
      data
    );

    return res.data.data;
  };

  