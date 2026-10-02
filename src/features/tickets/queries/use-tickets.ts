import { useQuery } from "@tanstack/vue-query";
import { ticketKeys } from "../constants/query-key";
import { getTickets } from "../api/get-tickets";

export const useTickets = () => {
  return useQuery({
    queryKey: ticketKeys.list(),
    queryFn: getTickets,
  });
};
