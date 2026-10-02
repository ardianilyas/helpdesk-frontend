<script setup lang="ts">
import { ref } from 'vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Ellipsis } from '@lucide/vue';
import type { Ticket } from '@/features/tickets/types/ticket.type';
import EditTicketDialog from './EditTicketDialog.vue';
import DeleteTicketDialog from './DeleteTicketDialog.vue';

defineProps<{
  ticket: Ticket;
}>();

const editOpen = ref(false);
const deleteOpen = ref(false);
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
      >
        <Ellipsis />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="editOpen = true">
        Edit
      </DropdownMenuItem>

      <DropdownMenuItem class="text-destructive" @click="deleteOpen = true">
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <EditTicketDialog
    :ticket="ticket"
    v-model:open="editOpen"
  />

  <DeleteTicketDialog
    :ticket="ticket"
    v-model:open="deleteOpen"
  />
</template>
