import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateTicket, type UpdateTicketPayload } from "../api/update-ticket";
import { ticketKeys } from "../constants/query-key";
import { toast } from "vue-sonner";

interface UpdateTicketVariables {
  id: string;
  payload: UpdateTicketPayload;
}

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateTicketVariables) => updateTicket(payload, id),

    onSuccess: () => {
      toast.success("Ticket updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ticketKeys.list(),
      });
    },
  });
};
