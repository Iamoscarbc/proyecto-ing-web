import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import HomeLayout from '@/layout/HomeLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: 'index'
    },
    {
      path: '/index',
      redirect: 'index',
      component: HomeLayout,
      name: 'HomeLayout',
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import(/* webpackChunkName: "demo" */ './views/Index.vue')
        },
        {
          path: '/aboutus',
          name: 'aboutus',
          component: () => import(/* webpackChunkName: "demo" */ './views/AboutUs.vue')
        }
      ]      
    },
    {
      path: '/login',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/registro',
          name: 'registro',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    },
    {
      path: '/home',
      redirect: 'dashboard',
      component: DashboardLayout,
      name: 'DashboardLayout',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        }
      ]
    }
  ]
})
