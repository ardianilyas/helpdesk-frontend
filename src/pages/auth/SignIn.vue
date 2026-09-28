<template>
  <div>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" v-model="email" />
      </div>
      <div class="space-y-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" v-model="password" />
      </div>

      <Button class="w-full" type="submit" :disabled="isLoading">
        {{ isLoading ? 'Signing in...' : 'Sign in' }}
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

const router = useRouter();
const email = ref('ardian@developer.com');
const password = ref('developer');

const authStore = useAuthStore();

const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;

  try {
    const { data, error } = await authClient.signIn.email({
      email: email.value,
      password: password.value,
    });

    if(error) {
      console.error(error);
      toast.error(error.message ?? 'Something went wrong. Please try again');
      return;
    }

    if (data?.user) {
      authStore.setUser({
        email: data.user.email,
        name: data.user.name,
        role: data.user.role
      });
    }

    toast.success("You're signed in");
    await router.push({ name: 'home' });
  } catch (e: any){
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
</script>
