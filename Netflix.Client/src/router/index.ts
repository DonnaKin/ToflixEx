import { createRouter, createWebHistory, NavigationGuard, RouteRecordRaw } from "vue-router";
import { AccountStore } from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/toflix/home'
  },
  {
    path: '/toflix',
    name: 'toflix',
    component: () => import(/* webpackChunkName: "MainView" */ '../views/MainView.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Login" */ '../components/organisms/login/Login.vue'),
      },
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "Main" */ '../components/organisms/Contents/MainContents.vue'),
      },
      {
        path: 'search',
        name: 'search',
        component: () => import(/* webpackChunkName: "Search" */ '../components/organisms/Contents/SearchContents.vue'),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const AuthGuard: NavigationGuard = async (to, from, next) => {
    const accountState = AccountStore();
    
    if (to.name == "login")
      next();
    else if (await accountState.TryCheck())
      next();
    else
      next({ name: 'login' })
}

router.beforeEach(AuthGuard)

export default router;