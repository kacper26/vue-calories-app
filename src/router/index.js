import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '../firebaseConfig.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-meal',
    name: 'add-meal',
    component: () => import(/* webpackChunkName: "add-meal" */ '../views/AddMealView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page-not-found',
    component: () => import(/* webpackChunkName: "page-not-found" */ '../components/PageNotFound.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (auth.currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
