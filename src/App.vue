<template>
  <section class="main-container">
    <AppHeader />
    <RouterView />
    <UserMsg />
  </section>
</template>

<script>
import { userService } from './services/user.service'
import { store } from './store/store'

import AppHeader from './cmps/AppHeader.vue'
import UserMsg from './cmps/UserMsg.vue'

export default {
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
    // console.log('Vue App created')
    // const user = userService.getLoggedinUser()
    // if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  components: {
    AppHeader,
    UserMsg,
  },
}
</script>
