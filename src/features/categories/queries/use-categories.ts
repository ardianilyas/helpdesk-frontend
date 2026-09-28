import { useQuery } from "@tanstack/vue-query"
import { categoryKeys } from "../constants/query-key"
import { getCategories } from "../api/get-categories"

export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
  });
}
