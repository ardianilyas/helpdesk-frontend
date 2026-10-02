<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'

const route = useRoute()
const router = useRouter()

const statusCode = computed(() => route.meta.statusCode ?? 500)

const title = computed(() => {
  return route.meta.errorTitle ?? 'Something went wrong'
})

const message = computed(() => {
  return route.meta.errorMessage ?? 'An unexpected error occurred.'
})

const goHome = () => {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <main class="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-background">
    <div class="flex flex-col items-center max-w-md space-y-4">
      <span class="text-7xl font-extrabold tracking-tight text-primary">
        {{ statusCode }}
      </span>

      <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {{ title }}
      </h1>

      <p class="text-sm text-muted-foreground">
        {{ message }}
      </p>

      <div class="pt-2">
        <Button @click="goHome">
          Go to Dashboard
        </Button>
      </div>
    </div>
  </main>
</template>