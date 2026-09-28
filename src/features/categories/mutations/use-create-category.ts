import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { createCategory } from "../api/create-category";
import { categoryKeys } from "../constants/query-key";
import { toast } from "vue-sonner";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
      toast.success("Category created successfully!");
      queryClient.invalidateQueries({
        queryKey: categoryKeys.list() 
      });
    },

    onError: (e) => {
      console.log(e.message);
    }
  })
}