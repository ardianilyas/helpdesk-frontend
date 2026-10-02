<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Ticket, TicketPriority } from '@/features/tickets/types/ticket.type';
import { useUpdateTicket } from '@/features/tickets/mutations/use-update-ticket';
import { useCategories } from '@/features/categories/queries/use-categories';
import { useValidationErrors } from '@/composables/use-validation-errors';

interface Props {
  ticket: Ticket;
  open: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const title = ref('');
const description = ref('');
const categoryId = ref('');
const ticketPriority = ref<TicketPriority>('low');

const { data: categories, isLoading: isLoadingCategories } = useCategories();
const { mutateAsync, isPending, error } = useUpdateTicket();

const { fieldErrors } = useValidationErrors<'categoryId' | 'title' | 'description' | 'ticketPriority'>(error);

const resetForm = () => {
  title.value = props.ticket.title;
  description.value = props.ticket.description;
  categoryId.value = props.ticket.categoryId;
  ticketPriority.value = props.ticket.ticketPriority ?? 'low';
};

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      resetForm();
    }
  }
);

const handleOpenChange = (value: boolean) => {
  emit('update:open', value);
};

const handleSubmit = async () => {
  try {
    await mutateAsync({
      id: props.ticket.id,
      payload: {
        title: title.value.trim(),
        description: description.value.trim(),
        categoryId: categoryId.value,
        ticketPriority: ticketPriority.value,
      },
    });

    emit('update:open', false);
  } catch {
    // Validation errors handled by useValidationErrors
  }
};
</script>

<template>
  <Dialog :open="open" @update:open="handleOpenChange">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Ticket</DialogTitle>
        <DialogDescription>
          Update the ticket details.
        </DialogDescription>
      </DialogHeader>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <Label for="edit-title">Title</Label>
          <Input
            id="edit-title"
            v-model="title"
            :disabled="isPending"
            :aria-invalid="!!fieldErrors.title"
          />
          <p v-if="fieldErrors.title" class="text-sm text-destructive">
            {{ fieldErrors.title }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="edit-category">Category</Label>
          <Select v-model="categoryId" :disabled="isPending || isLoadingCategories">
            <SelectTrigger id="edit-category" :aria-invalid="!!fieldErrors.categoryId">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.id"
                >
                  {{ cat.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p v-if="fieldErrors.categoryId" class="text-sm text-destructive">
            {{ fieldErrors.categoryId }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="edit-priority">Priority</Label>
          <Select v-model="ticketPriority" :disabled="isPending">
            <SelectTrigger id="edit-priority" :aria-invalid="!!fieldErrors.ticketPriority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="low">
                  <div class="flex items-center gap-2">
                    <span class="size-2 rounded-full bg-green-500" />
                    <span>Low</span>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div class="flex items-center gap-2">
                    <span class="size-2 rounded-full bg-yellow-500" />
                    <span>Medium</span>
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div class="flex items-center gap-2">
                    <span class="size-2 rounded-full bg-red-500" />
                    <span>High</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p v-if="fieldErrors.ticketPriority" class="text-sm text-destructive">
            {{ fieldErrors.ticketPriority }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="edit-description">Description</Label>
          <Input
            id="edit-description"
            v-model="description"
            :disabled="isPending"
            :aria-invalid="!!fieldErrors.description"
          />
          <p v-if="fieldErrors.description" class="text-sm text-destructive">
            {{ fieldErrors.description }}
          </p>
        </div>

        <DialogFooter>
          <Button type="submit" :disabled="isPending">
            {{ isPending ? 'Updating...' : 'Update' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
