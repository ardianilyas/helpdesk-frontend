import { api } from "@/lib/api";
import type { Ticket, TicketPriority } from "../types/ticket.type";

export interface CreateTicketRequest {
  categoryId: string;
  title: string;
  description: string;
  ticketPriority: TicketPriority;
}

interface CreateTicketResponse {
  success: string;
  message: string;
  data: Ticket;
}

export const createTicket = async (payload: CreateTicketRequest): Promise<Ticket> => {
  const { data } = await api.post<CreateTicketResponse>("/tickets", payload);

  return data.data;
}
