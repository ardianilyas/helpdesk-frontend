import { api } from "@/lib/api";
import type { Category } from "../types/category.type";

interface GetCategoriesResponse {
  success: string;
  message: string;
  data: Category[];
}

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<GetCategoriesResponse>("/categories");

  return data.data;
}
