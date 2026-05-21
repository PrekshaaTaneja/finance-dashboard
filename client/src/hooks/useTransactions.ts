import { useQuery } from "@tanstack/react-query";

import { getTransactions } from "@/services/transaction.service";

import { queryKeys } from "@/lib/queryKeys";

interface Props {
  page: number;
  search: string;
  type: string;
}

export const useTransactions = ({
  page,
  search,
  type,
}: Props) => {
  return useQuery({
    queryKey:
      queryKeys.transactions(
        page,
        search,
        type
      ),

    queryFn: () =>
      getTransactions({
        page,
        search,
        type,
      }),
  });
};