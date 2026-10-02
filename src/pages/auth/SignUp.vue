<template>
  <div>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <Label for="name">Username</Label>
        <Input id="name" type="name" v-model="name" placeholder="Adrien" />
      </div>
      <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" v-model="email" placeholder="adrien@team.com" />
      </div>
      <div class="space-y-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" v-model="password" placeholder="*********" />
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
const email = ref('');
const password = ref('');
const name = ref('');

const authStore = useAuthStore();

const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;

  try {
    const { data, error } = await authClient.signUp.email({
      email: email.value,
      password: password.value,
      name: name.value
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
    await router.push({ name: 'dashboard' });
  } catch (e: any){
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
</script>
