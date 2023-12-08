import { createRouter, createWebHistory } from 'vue-router'
import {isAuth} from '@/utils/jwt'

const HomeView = () => import('@/views/HomeView.vue')
const AuthView = () => import('@/views/AuthView.vue')
const notFound = () => import('@/views/notFound.vue')
const Login = () => import('@/components/AuthComponent/LoginComponent.vue')
const enrolls = () => import('@/views/pages/enrolls.vue')
const department = () => import('@/views/pages/department.vue')
const profile = () => import('@/views/pages/profile.vue')
const semester = () => import('@/views/pages/semester.vue')
const student = () => import('@/views/pages/student.vue')
const subject = () => import('@/views/pages/subject.vue')
const users = () => import('@/views/pages/users.vue')
const home = () => import('@/views/pages/home.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 
    {
      path: '/',
      component: HomeView,
      meta: { isAuthenticated: true,  title: 'FMS | خانه' },
      children: [
        {
          path: '/',
          name:"home",
          component: home,
          meta: {  title: 'FMS | خانه' },
        },
        {
          path: 'student',
          component: student,
          meta: {  title: 'FMS | محصلین' },
        },
        {
          path: 'enrolls',
          component: enrolls,
          meta: {  title: 'FMS | نمرات' },
        },
        {
          path: 'profile',
          component: profile,
          meta: {  title: 'FMS | پروفایل' },
        },
        {
          path: 'settings/department',
          component: department,
          meta: {  title: 'FMS | دیپارتنمت' },
        },
        {
          path: 'settings/semester',
          component: semester,
          meta: {  title: 'FMS | سمستر' },
        },
        {
          path: 'settings/subject',
          component: subject,
          meta: {  title: 'FMS | مضامین' },
        },
        {
          path: 'settings/user',
          component: users,
          meta: {  title: 'FMS | کاربران' },
        }

      ]
    },
    {
      path: '/',
      component: AuthView,
      children: [
        {
          path: 'login',
          component: Login,
          meta: { title: 'FMS | Login' },
        }
      ]
    },
    {
      path: "/:NotFound(.*)*",
      component: notFound,
      meta: {  title: 'FMS | Not Found' },

    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = String(to.meta.title) || 'FMS';
  next();
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.isAuthenticated)) {
    
//     if (isAuth()) {
//       next();
//     } else {
//       next('/login');
//     }
//   } else {
//     next(); 
//   }
// });

export default router
