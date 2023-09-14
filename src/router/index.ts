import { createRouter, createWebHistory } from 'vue-router'
import isAuthenticated from '@/utils/jwt'

const HomeView = () => import('@/views/HomeView.vue')
const AuthView = () => import('@/views/AuthView.vue')
const notFound = () => import('@/views/notFound.vue')
const Login = () => import('@/components/AuthComponent/LoginComponent.vue')
const about = () => import('@/views/pages/about.vue')
const enrolls = () => import('@/views/pages/enrolls.vue')
const department = () => import('@/views/pages/department.vue')
const profile = () => import('@/views/pages/profile.vue')
const semester = () => import('@/views/pages/semester.vue')
const student = () => import('@/views/pages/student.vue')
const subject = () => import('@/views/pages/subject.vue')
const users = () => import('@/views/pages/users.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: { isAuthenticated: true },
      children: [
        // {
        //   path: 'about',
        //   component: about
        // },
        {
          path: 'student',
          component: student
        },
        {
          path: 'enrolls',
          component: enrolls
        },
        {
          path: 'profile',
          component: profile
        },
        {
          path: 'settings/department',
          component: department
        },
        {
          path: 'settings/semester',
          component: semester
        },
        {
          path: 'settings/subject',
          component: subject
        },
        {
          path: 'settings/user',
          component: users
        }

      ]
    },
    {
      path: '/',
      component: AuthView,
      children: [
        {
          path: 'login',
          component: Login
        }
      ]
    },
    {
      path: "/:NotFound(.*)*",
      component: notFound,
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.isAuthenticated)) {
//     if (isAuthenticated()) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router
