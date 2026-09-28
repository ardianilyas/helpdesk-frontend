import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.ts'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useAuthStore } from './stores/auth.store.ts'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './lib/tanstack-query.ts'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, {
  queryClient
});

const authStore = useAuthStore(pinia)

await authStore.initialize()

app.mount('#app')
