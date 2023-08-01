import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import BoardIndex from './views/BoardIndex.vue'
import LoginSignup from './views/LoginSignup.vue'
import BoardDetails from './views/BoardDetails.vue'
import TaskDetails from './views/TaskDetails.vue'
import UserDetails from './views/UserDetails.vue'

import AppHeader from './cmps/AppHeader.vue' // Import the AppHeader component
import HomepageHeader from './cmps/HomepageHeader.vue' // Import the HomepageHeader component

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      header: HomepageHeader, // Use the HomepageHeader component for the '/' route
      default: Home,
    },
  },
  {
    path: '/board',
    name: 'BoardIndex',
    components: {
      header: AppHeader, // Use the AppHeader component for the '/board' route
      default: BoardIndex,
    },
  },
  {
    path: '/board/:id',
    name: 'BoardDetails',
    components: {
      header: AppHeader, // Use the AppHeader component for the '/board/:id' route
      default: BoardDetails,
    },
    children: [
      {
        path: 'group/:groupId/task/:taskId',
        name: 'TaskDetails',
        component: TaskDetails,
      },
    ],
  },

  {
    path: '/login',
    name: 'LoginSignup',
    components: {
      header: HomepageHeader, // Use the HomepageHeader component for the '/login' route
      default: LoginSignup,
    },
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    components: {
      header: AppHeader, // Use the AppHeader component for the '/user/:id' route
      default: UserDetails,
    },
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // base: process.env.BASE_URL,
})
