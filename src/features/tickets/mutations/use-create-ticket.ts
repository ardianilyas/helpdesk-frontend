import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createTicket } from "../api/create-ticket";
import { ticketKeys } from "../constants/query-key";
import { toast } from "vue-sonner";

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTicket,

    onSuccess: () => {
      toast.success("Ticket created successfully!");
      queryClient.invalidateQueries({
        queryKey: ticketKeys.list(),
      });
    },

    onError: (e) => {
      console.log(e.message);
    },
  });
};
