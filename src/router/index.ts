import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import SignIn from "../pages/auth/SignIn.vue";
import { useAuthStore } from "@/stores/auth.store.ts";
import Unauthorized from "@/pages/errors/Unauthorized.vue";
import Forbidden from "@/pages/errors/Forbidden.vue";
import NotFound from "@/pages/errors/NotFound.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import DashboardIndex from "@/pages/dashboard/DashboardIndex.vue";
import Categories from "@/pages/dashboard/Categories.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/errors/401',
      name: 'unauthorized',
      component: Unauthorized,
      meta: {
        statusCode: 401,
        errorTitle: 'Unauthorized',
        errorMessage: 'You need to sign in to access this resource.',
      }
    },
    {
      path: '/errors/403',
      name: 'forbidden',
      component: Forbidden,
      meta: {
        statusCode: 403,
        errorTitle: 'Forbidden',
        errorMessage: 'You do not have permission to access this resource.',
      },
    },
    {
      path: '/errors/404',
      name: 'not-found',
      component: NotFound,
      meta: {
        statusCode: 404,
        errorTitle: 'Page Not Found',
        errorMessage: 'The page you are looking for does not exist.',
      },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'signin',
          name: 'signin',
          component: SignIn,
          meta: {
            requiresGuest: true,
            title: 'Good to see you again',
            description: 'Sign in and pick up where you left off.'
          }
        }
      ]
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardIndex,
        },
        {
          path: 'categories',
          name: 'categories',
          component: Categories,
          meta: {
            title: 'Categories',
            description: 'Manage your categories.'
          }
        }
      ]
    }
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if(!authStore.initialized) {
    await authStore.initialize();
  }

  if(to.meta.requiresAuth && !authStore.user) {
    return {
      name: 'signin'
    }
  }

  if(to.meta.requiresGuest && authStore.user) {
    return {
      name: 'dashboard'
    }
  }
})

export default router;
