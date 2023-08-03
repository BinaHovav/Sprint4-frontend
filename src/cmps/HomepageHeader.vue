<template>
  <header class="homepage-header">
    <div class="left-nav">
      <img src="https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691058928/image-removebg-preview_thzggs.png" />
      <nav class="homepage-navbar"></nav>
    </div>
    <div class="right-nav">
      <a  href="#/login" class="nav-link">{{loggedInUser? `Hello ${loggedInUser.fullname}` : 'Log in'}}</a>
      <RouterLink to="/board" class="nav-link-signup nav-link">Try Mellow</RouterLink>
    </div>
  </header>
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
