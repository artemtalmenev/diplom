import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/detailobject/:id',
    name: 'detailobject',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/DetailObject.vue')
  },
  {
    path: '/tasks/:id',
    name: 'tasks',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Tasks.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Record.vue')
  },
  {
    path: '/task',
    name: 'task',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Task.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Users.vue')
  },
  {
    path: '/objects',
    name: 'objects',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Objects.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requierAuth = to.matched.some(record => record.meta.auth)

  if (requierAuth && !currentUser) {
    next('/?message=login')
  } else {
    next()
  }

})

export default router
