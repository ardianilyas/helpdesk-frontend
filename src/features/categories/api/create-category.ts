import { api } from "@/lib/api";
import type { Category } from "../types/category.type";

interface CreateCategoryRequest {
  name: string;
  description: string;
}

interface CreateCategoryResponse {
  success: string;
  message: string;
  data: Category;
}

export const createCategory = async (payload: CreateCategoryRequest): Promise<Category> => {
  const { data } = await api.post<CreateCategoryResponse>("/categories", payload);

  return data.data;
}
