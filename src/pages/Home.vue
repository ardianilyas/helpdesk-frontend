<template>
  <div class="min-h-screen flex justify-center items-center px-12" >
    <h1 class="text-5xl font-extralight">Welcome to Ticket Report System, {{ authStore.user?.name ?? 'User' }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
</script>
