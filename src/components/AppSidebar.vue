<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  GalleryVerticalEnd,
  SquareTerminal,
} from "@lucide/vue"
import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/auth.store'
import { computed } from 'vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})

const authStore = useAuthStore()

const user = computed(() => ({
  name: authStore.user?.name ?? '',
  email: authStore.user?.email ?? '',
  avatar: "/avatars/shadcn.jpg",
}))

const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
]

const navMain = computed(() => {
  const mainMenuChildren = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Tickets",
      url: "/dashboard/tickets",
    },
  ]

  if (authStore.isAdmin) {
    mainMenuChildren.push({
      title: "Categories",
      url: "/dashboard/categories",
    })
  }

  return [
    {
      title: "Main Menu",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: mainMenuChildren,
    },
  ]
})
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
