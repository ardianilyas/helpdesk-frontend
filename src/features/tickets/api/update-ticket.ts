import { api } from "@/lib/api";
import type { Ticket, TicketPriority } from "../types/ticket.type";

export interface UpdateTicketPayload {
  categoryId: string;
  title: string;
  description: string;
  ticketPriority: TicketPriority;
}

interface UpdateTicketResponse {
  success: string;
  message: string;
  data: Ticket;
}

export const updateTicket = async (payload: UpdateTicketPayload, id: string): Promise<Ticket> => {
  const { data } = await api.patch<UpdateTicketResponse>(`/tickets/${id}`, payload);

  return data.data;
}
