import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { deleteTicket } from "../api/delete-ticket";
import { ticketKeys } from "../constants/query-key";
import { toast } from "vue-sonner";

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTicket,

    onSuccess: () => {
      toast.success("Ticket deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ticketKeys.list(),
      });
    },
  });
};
