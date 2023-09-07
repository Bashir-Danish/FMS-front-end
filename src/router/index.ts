import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import notFound from '@/views/notFound.vue'
import Login from '@/components/auth/login.vue'
import about from '@/views/pages/about.vue'
import enrolls from '@/views/pages/enrolls.vue'
import department from '@/views/pages/department.vue'
import profile from '@/views/pages/profile.vue'
import semester from '@/views/pages/semester.vue'
import student from '@/views/pages/student.vue'
import subject from '@/views/pages/subject.vue'
import users from '@/views/pages/users.vue'
import isAuthenticated from '@/utils/jwt'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta :{isAuthenticated :true},
      children:[
        // {
        //   path:'about',
        //   component:about
        // },
        {
          path:'student',
          component:student
        },
        {
          path:'enrolls',
          component:enrolls
        },
        {
          path:'profile',
          component:profile
        },
        {
          path:'settings/department',
          component:department
        },
        {
          path:'settings/semester',
          component:semester
        },
        {
          path:'settings/subject',
          component:subject
        },
        {
          path:'settings/user',
          component:users
        }

      ]
    },{
      path: '/',
      component: AuthView,
      children:[
        {
          path:'login',
          component:Login
        }
      ]
    },
    {
      path: "/:NotFound(.*)*",
      component: notFound,
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isAuthenticated)) {
    if (isAuthenticated()) {
      
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
