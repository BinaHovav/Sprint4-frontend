<template>
  <section class="main-container">
    <AppHeader />
    <RouterView />
    <UserMsg />
    <AppModal/>
  </section>
</template>
import AppModal from './cmps/AppModal.vue'

<script>
import { userService } from './services/user.service'
import { store } from './store/store'

import AppHeader from './cmps/AppHeader.vue'
import UserMsg from './cmps/UserMsg.vue'
import AppModal from './cmps/AppModal.vue'

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
    AppModal
},
}
</script>
