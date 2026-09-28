<script setup lang="ts">
import { ref, watch } from 'vue'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Category } from '@/features/categories/types/category.type'
import { useUpdateCategory } from '@/features/categories/mutations/use-update-category'
import { useValidationErrors } from '@/composables/use-validation-errors'

interface Props {
  category: Category,
  open: boolean,
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const name = ref('')
const description = ref('')

const { mutateAsync, isPending, error } = useUpdateCategory()

const { fieldErrors } = useValidationErrors<'name' | 'description'>(error);

const resetForm = () => {
  name.value = props.category.name
  description.value = props.category.description
}

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    resetForm()
  }
});

const handleOpenChange = (value: boolean) => {
  emit('update:open', value)
}

const handleSubmit = async () => {
  await mutateAsync({
    id: props.category.id,
    payload: {
      name: name.value.trim(),
      description: description.value.trim(),
    },
  })

  emit('update:open', false);
}
</script>

<template>
  <Dialog :open="open" @update:open="handleOpenChange">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>

        <DialogDescription>
          Update the category information.
        </DialogDescription>
      </DialogHeader>

      <form
        class="space-y-4"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-2">
          <Label for="category-name">
            Name
          </Label>

          <Input
            id="category-name"
            v-model="name"
            :disabled="isPending"
            :aria-invalid="!!fieldErrors.name"
          />

          <p
            v-if="fieldErrors.name"
            class="text-sm text-destructive"
          >
            {{ fieldErrors.name }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="category-description">
            Description
          </Label>

          <Input
            id="category-description"
            v-model="description"
            :disabled="isPending"
            :aria-invalid="!!fieldErrors.description"
          />

          <p
            v-if="fieldErrors.description"
            class="text-sm text-destructive"
          >
            {{ fieldErrors.description }}
          </p>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            :disabled="isPending"
          >
            {{ isPending ? 'Updating...' : 'Update' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>