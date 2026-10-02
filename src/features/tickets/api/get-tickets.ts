import { api } from "@/lib/api";
import type { Ticket } from "../types/ticket.type";

interface GetTicketsResponse {
  success: string;
  message: string;
  data: Ticket[];
}

export const getTickets = async (): Promise<Ticket[]> => {
  const { data } = await api.get<GetTicketsResponse>("/tickets");

  return data.data;
}
