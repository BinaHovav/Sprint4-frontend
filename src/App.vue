<template>
  <section class="main-container">
    <AppHeader />
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
import UserMsg from './cmps/UserMsg.vue'
import AppModal from './cmps/AppModal.vue'
import TaskEditor from './cmps/TaskEditor.vue'

export default {
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
    // const user = userService.getLoggedinUser()
    // if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  computed: {
  },

  components: {
    AppHeader,
    UserMsg,
    AppModal,
    TaskEditor
  },
}
</script>
