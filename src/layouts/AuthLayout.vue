<template>
  <div class="min-h-screen flex justify-center items-center px-12">
    <div>
      <Card class="min-w-xl w-full">
        <CardHeader>
          <CardTitle> {{ route.meta.title }} </CardTitle>
          <CardDescription> {{ route.meta.description }} </CardDescription>
        </CardHeader>
        <CardContent>
          <RouterView />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>