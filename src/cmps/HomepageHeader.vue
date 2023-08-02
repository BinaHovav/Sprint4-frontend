<template>
  <header class="homepage-header">
    <div class="left-nav">
      <img src="https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690958863/Screenshot_2023-08-02_at_9.35.41-removebg-preview_vejw3s.png" />
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
