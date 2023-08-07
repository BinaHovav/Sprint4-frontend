<template>
  <div class="homepage-header-contatiner">
    <header class="homepage-header">
      <div class="left-nav">
        <img src="https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691386564/Screenshot_2023-08-02_at_16.22.17-removebg-preview_msgzwz.png" />
        <nav class="homepage-navbar"></nav>
      </div>
      <div class="right-nav">
        <a href="#/login" class="nav-link">{{ loggedInUser ? `Log out` : 'Log in' }}</a>
        <RouterLink to="/board" class="nav-link-signup nav-link">Try Mellow</RouterLink>
        <RouterLink to="/board" class="nav-link-signup-small-screen nav-link">Try</RouterLink>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'homepageHeader',
  data() {
    return {}
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {},
  methods: {},
}
</script>
