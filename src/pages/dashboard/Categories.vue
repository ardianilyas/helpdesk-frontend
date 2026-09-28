<script setup lang="ts">
import CreateCategoryDialog from '@/components/CreateCategoryDialog.vue';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCategories } from '@/features/categories/queries/use-categories';

const { data: categories } = useCategories();
</script>

<template>
  <div>
    <CreateCategoryDialog />
  </div>

  <div class="my-4">
    <Card class="overflow-hidden pt-0">
      <Table>
        <TableHeader class="bg-muted">
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(category, index) in categories" :key="category.id">
            <TableCell> {{ index + 1 }} </TableCell>
            <TableCell> {{ category.name }} </TableCell>
            <TableCell> {{ category.description }} </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  </div>
</template>