import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateCategory, type UpdateCategoryPayload } from "../api/update-category";
import { toast } from "vue-sonner";

interface UpdateCategoryVariables {
  id: string;
  payload: UpdateCategoryPayload;
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateCategoryVariables) => updateCategory(payload, id),

    onSuccess: () => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["categories"]
      });
    }
  })
}
