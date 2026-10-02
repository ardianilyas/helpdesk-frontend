<script setup lang="ts">
import { computed } from 'vue';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ApiError } from '@/lib/api-error';
import type { Ticket } from '@/features/tickets/types/ticket.type';
import { useDeleteTicket } from '@/features/tickets/mutations/use-delete-ticket';

const props = defineProps<{
  ticket: Ticket;
  open: boolean;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const { mutateAsync, isPending, error } = useDeleteTicket();

const errorMessage = computed(() => {
  if (error.value instanceof ApiError) {
    return error.value.message;
  }

  if (error.value) {
    return 'Something went wrong. Please try again.';
  }

  return '';
});

const handleDelete = async () => {
  try {
    await mutateAsync(props.ticket.id);
    emit('update:open', false);
  } catch {
    // Error is already available through `error`
  }
};
</script>

<template>
  <AlertDialog
    :open="open"
    @update:open="emit('update:open', $event)"
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Delete Ticket?
        </AlertDialogTitle>

        <AlertDialogDescription>
          Are you sure you want to delete
          <strong>{{ ticket.title }}</strong>?
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <p
        v-if="errorMessage"
        class="text-sm text-destructive"
      >
        {{ errorMessage }}
      </p>

      <AlertDialogFooter>
        <AlertDialogCancel :disabled="isPending">
          Cancel
        </AlertDialogCancel>

        <AlertDialogAction
          variant="destructive"
          :disabled="isPending"
          @click.prevent="handleDelete"
        >
          {{ isPending ? 'Deleting...' : 'Delete' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
