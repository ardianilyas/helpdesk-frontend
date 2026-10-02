import { api } from "@/lib/api";

export const deleteTicket = async (id: string): Promise<void> => {
  await api.delete(`/tickets/${id}`);
}
