import { api } from "@/lib/api";
import type { Category } from "../types/category.type";

export interface UpdateCategoryPayload {
  name: string;
  description: string;
}

interface UpdateCategoryResponse {
  success: string;
  message: string;
  data: Category;
}

export const updateCategory = async(payload: UpdateCategoryPayload, id: string): Promise<Category> => {
  const { data } = await api.patch<UpdateCategoryResponse>(`/categories/${id}`, payload);

  return data.data;
}
