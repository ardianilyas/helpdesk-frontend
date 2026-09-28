import { api } from "@/lib/api";

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
}
