<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
  <main class="error-layout">
    <div class="error-content">
      <span>{{ statusCode }}</span>

      <h1>{{ title }}</h1>

      <p>{{ message }}</p>

      <button @click="goHome">
        Go to Dashboard
      </button>
    </div>
  </main>
</template>