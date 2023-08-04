<template>
  <section class="main-container">
    <AppHeader v-if="showAppHeader" />
    <HomepageHeader v-else />
    <RouterView />

    <UserMsg />
    <AppModal />
    <TaskEditor />
  </section>
</template>

<script>
// import AppModal from './cmps/AppModal.vue'
// import { userService } from './services/user.service'

// import { store } from './store/store'

import AppHeader from './cmps/AppHeader.vue'
import HomepageHeader from './cmps/HomepageHeader.vue'
import UserMsg from './cmps/UserMsg.vue'
import AppModal from './cmps/AppModal.vue'
import TaskEditor from './cmps/TaskEditor.vue'
import { SOCKET_EVENT_UPDATE_BOARD, socketService } from './services/socket.service'

export default {
  data() {
    return {
      loaded: false
    }
  },
  created() {
    this.loadBoards()
    socketService.on(SOCKET_EVENT_UPDATE_BOARD , ()=> {
      console.log('updating-board');
      this.loadBoards()
    })
    // const user = userService.getLoggedinUser()
    // if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  methods: {
    async loadBoards() {
      await this.$store.dispatch({ type: 'loadBoards' })
      this.loaded = true

    }
  },

  computed: {
    showAppHeader() {
      const routeName = this.$route.name // Get the current route name directly from Vue Router

      // Define the names of routes that should show the AppHeader component
      const appHeaderRoutes = ['BoardIndex', 'BoardDetails', 'ReviewIndex', 'UserDetails', 'TaskDetails']

      // Check if the current route name is in the list of routes that should show the AppHeader
      return appHeaderRoutes.includes(routeName)
    },
  },

  components: {
    AppHeader,
    HomepageHeader,
    UserMsg,
    AppModal,
    TaskEditor,
  },
}
</script>
