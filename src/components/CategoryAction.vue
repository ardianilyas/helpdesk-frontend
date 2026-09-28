<script setup lang="ts">
import { ref } from 'vue'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { Ellipsis } from '@lucide/vue';
import type { Category } from '@/features/categories/types/category.type';
import EditCategoryDialog from './EditCategoryDialog.vue';
import DeleteCategoryDialog from './DeleteCategoryDialog.vue';

defineProps<{
  category: Category
}>()

const editOpen = ref(false)
const deleteOpen = ref(false)
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

  <EditCategoryDialog
    :category="category"
    v-model:open="editOpen"
  />

  <DeleteCategoryDialog v-model:open="deleteOpen" :category="category" />
</template>
