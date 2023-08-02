<template>
  <header class="homepage-header">
    <div class="left-nav">
      <img src="https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690963675/Screenshot_2023-08-02_at_11.06.57-removebg-preview_vc8mw0.png" />
      <nav class="homepage-navbar"></nav>
    </div>
    <div class="right-nav">
      <a href="#/login" class="nav-link">Log in</a>
      <RouterLink to="/board" class="nav-link-signup nav-link">Try Mellow!</RouterLink>
    </div>
  </header>
</template>

<script>
export default {
  name: 'homepageHeader',
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {},
}
</script>
