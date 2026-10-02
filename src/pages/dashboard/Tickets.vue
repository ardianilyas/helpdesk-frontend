<script setup lang="ts">
import { computed } from 'vue';
import CreateTicketDialog from '@/components/CreateTicketDialog.vue';
import TicketAction from '@/components/TicketAction.vue';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTickets } from '@/features/tickets/queries/use-tickets';
import { useCategories } from '@/features/categories/queries/use-categories';
import type { TicketPriority } from '@/features/tickets/types/ticket.type';

const { data: tickets, isLoading } = useTickets();
const { data: categories } = useCategories();

const categoryMap = computed(() => {
  const map = new Map<string, string>();
  if (categories.value) {
    for (const cat of categories.value) {
      map.set(cat.id, cat.name);
    }
  }
  return map;
});

const getCategoryName = (categoryId: string, ticketCategory?: { name: string }) => {
  if (ticketCategory?.name) return ticketCategory.name;
  return categoryMap.value.get(categoryId) ?? '-';
};

const getPriorityBadgeClass = (priority: TicketPriority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900';
    case 'medium':
      return 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-400 dark:border-yellow-900';
    case 'low':
    default:
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-900';
  }
};
</script>

<template>
  <div>
    <CreateTicketDialog />
  </div>

  <div class="my-4">
    <Card class="overflow-hidden pt-0">
      <Table>
        <TableHeader class="bg-muted">
          <TableRow>
            <TableHead class="w-16">No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Description</TableHead>
            <TableHead class="w-20 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="isLoading">
            <TableCell colspan="6" class="text-center py-6 text-muted-foreground">
              Loading tickets...
            </TableCell>
          </TableRow>
          <TableRow v-else-if="!tickets || tickets.length === 0">
            <TableCell colspan="6" class="text-center py-6 text-muted-foreground">
              No tickets found.
            </TableCell>
          </TableRow>
          <TableRow v-for="(ticket, index) in tickets" :key="ticket.id">
            <TableCell>{{ index + 1 }}</TableCell>
            <TableCell class="font-medium">{{ ticket.title }}</TableCell>
            <TableCell>{{ getCategoryName(ticket.categoryId, ticket.category) }}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                :class="['capitalize font-medium shadow-none', getPriorityBadgeClass(ticket.ticketPriority)]"
              >
                {{ ticket.ticketPriority }}
              </Badge>
            </TableCell>
            <TableCell class="max-w-md truncate">{{ ticket.description }}</TableCell>
            <TableCell class="text-right">
              <TicketAction :ticket="ticket" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  </div>
</template>
