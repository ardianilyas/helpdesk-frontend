<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button>Create Category</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Category</DialogTitle>
        <DialogDescription>
          Create new category data.
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-2 mb-2">
          <Label for="name">Name</Label>
          <Input
            v-model="name"
            id="name"
            placeholder="Category name"
            :aria-invalid="!!fieldErrors.name"
          />
          <p v-if="fieldErrors.name" class="text-sm text-destructive">{{ fieldErrors.name }}</p>
        </div>
        <div class="space-y-2">
          <Label for="description">Description</Label>
          <Input
            v-model="description"
            id="description"
            placeholder="Category description"
            :aria-invalid="!!fieldErrors.description"
          />
          <p v-if="fieldErrors.description" class="text-sm text-destructive">{{ fieldErrors.description }}</p>
        </div>
      </form>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button :loading="isPending" @click="handleSubmit">
          {{ isPending ? 'Creating...' : 'Create' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCreateCategory } from '@/features/categories/mutations/use-create-category';
import { ref, watch } from 'vue';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useValidationErrors } from '@/composables/use-validation-errors';

const open = ref(false);
const name = ref('');
const description = ref('');

const { mutateAsync, isPending, error, reset } = useCreateCategory();

const { fieldErrors } = useValidationErrors<'name' | 'description'>(error);

watch(open, (isOpen) => {
  if (!isOpen) {
    name.value = '';
    description.value = '';
    reset();
  }
});

const handleSubmit = async () => {
  try {
    await mutateAsync({
      name: name.value,
      description: description.value
    });

    open.value = false;
  } catch {
    // Validation errors are automatically bound to fieldErrors via useValidationErrors
  }
};
</script>
