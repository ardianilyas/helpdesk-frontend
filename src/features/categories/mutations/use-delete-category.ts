import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { deleteCategory } from "../api/delete-category";
import { categoryKeys } from "../constants/query-key";
import { toast } from "vue-sonner";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,

    onSuccess: () => {
      toast.success("Category deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: categoryKeys.list()
      });
    }
  });
}
