<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button>Create Ticket</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Ticket</DialogTitle>
        <DialogDescription>
          Create a new support ticket.
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="title">Title</Label>
          <Input
            v-model="title"
            id="title"
            placeholder="Ticket title"
            :disabled="isPending"
            :aria-invalid="!!fieldErrors.title"
          />
          <p v-if="fieldErrors.title" class="text-sm text-destructive">{{ fieldErrors.title }}</p>
        </div>

        <div class="space-y-2">
          <Label for="category">Category</Label>
          <Select v-model="categoryId" :disabled="isPending || isLoadingCategories">
            <SelectTrigger id="category" :aria-invalid="!!fieldErrors.categoryId">
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
          <p v-if="fieldErrors.categoryId" class="text-sm text-destructive">{{ fieldErrors.categoryId }}</p>
        </div>

        <div class="space-y-2">
          <Label for="priority">Priority</Label>
          <Select v-model="ticketPriority" :disabled="isPending">
            <SelectTrigger id="priority" :aria-invalid="!!fieldErrors.ticketPriority">
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
          <p v-if="fieldErrors.ticketPriority" class="text-sm text-destructive">{{ fieldErrors.ticketPriority }}</p>
        </div>

        <div class="space-y-2">
          <Label for="description">Description</Label>
          <Input
            v-model="description"
            id="description"
            placeholder="Ticket description"
            :disabled="isPending"
            :aria-invalid="!!fieldErrors.description"
          />
          <p v-if="fieldErrors.description" class="text-sm text-destructive">{{ fieldErrors.description }}</p>
        </div>

        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline" :disabled="isPending">Cancel</Button>
          </DialogClose>
          <Button type="submit" :disabled="isPending">
            {{ isPending ? 'Creating...' : 'Create' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useCategories } from '@/features/categories/queries/use-categories';
import { useCreateTicket } from '@/features/tickets/mutations/use-create-ticket';
import type { TicketPriority } from '@/features/tickets/types/ticket.type';
import { useValidationErrors } from '@/composables/use-validation-errors';

const open = ref(false);
const title = ref('');
const description = ref('');
const categoryId = ref('');
const ticketPriority = ref<TicketPriority>('low');

const { data: categories, isLoading: isLoadingCategories } = useCategories();
const { mutateAsync, isPending, error, reset } = useCreateTicket();

const { fieldErrors } = useValidationErrors<'categoryId' | 'title' | 'description' | 'ticketPriority'>(error);

watch(open, (isOpen) => {
  if (!isOpen) {
    title.value = '';
    description.value = '';
    categoryId.value = '';
    ticketPriority.value = 'low';
    reset();
  }
});

const handleSubmit = async () => {
  try {
    await mutateAsync({
      title: title.value,
      description: description.value,
      categoryId: categoryId.value,
      ticketPriority: ticketPriority.value,
    });

    open.value = false;
  } catch {
    // Validation errors are automatically bound to fieldErrors via useValidationErrors
  }
};
</script>
