import Vue from 'vue'
import Router from 'vue-router'
import jwt from 'jsonwebtoken'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import HomeLayout from '@/layout/HomeLayout'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [    
    { 
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      redirect: 'index',
      component: HomeLayout,
      name: 'HomeLayout',
      meta: { 
        guest: true
      },
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import(/* webpackChunkName: "demo" */ './views/Index.vue')
        },
        {
          path: '/aboutus',
          name: 'aboutus',
          component: () => import(/* webpackChunkName: "demo" */ './views/AboutUs.vue'),
          children:[
            {
              path: '/aboutus/historia',
              name: 'historia',
              component: () => import(/* webpackChunkName: "demo" */ './views/Historia.vue')
            },
            {
              path: '/aboutus/transportes',
              name: 'transportes',
              component: () => import(/* webpackChunkName: "demo" */ './views/Transportes.vue')
            },
            {
              path: '/aboutus/destinos',
              name: 'destinos',
              component: () => import(/* webpackChunkName: "demo" */ './views/Destinos.vue')
            }
          ]
        }
      ]      
    },
    {
      path: '/login',
      component: AuthLayout,
      meta: { 
        guest: true
      },
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
      meta: { 
          requiresAuth: true
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: { 
              requiresAuth: true,
              is_admin : true
          },
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
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('TKbGciOAiUbG1NiJ9iJIV1I') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = jwt.decode(localStorage.getItem('TKbGciOAiUbG1NiJ9iJIV1I'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.data.idRol == 1 || user.data.idRol == 2){
                  next()
              }
              else{
                  next({ name: 'profile'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('TKbGciOAiUbG1NiJ9iJIV1I') == null){
          next()
      }
      else{
          next()
      }
  }else {
      next() 
  }
})

export default router