<template>
  <header>
    <nav>
      <RouterLink to="/">
        <span role="img" aria-label="logo">🔳</span>
      </RouterLink>
      <RouterLink to="/board">
        <img src="https://trello.com/assets/87e1af770a49ce8e84e3.gif" alt="logo" />
      </RouterLink>
      <span>More</span>
      <RouterLink to="/login">Login / Signup</RouterLink>

      <section class="loggedin-user" v-if="loggedInUser">
        <RouterLink :to="`/user/${loggedInUser._id}`">
          {{ loggedInUser.fullname }}
        </RouterLink>
        <span>{{ loggedInUser.score?.toLocaleString() }}</span>
        <img :src="loggedInUser.imgUrl" />
      </section>
    </nav>
  </header>
</template>
<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
}
</script>
