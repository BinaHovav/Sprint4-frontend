<template>
  <header class="homepage-header">
    <div class="left-nav">
      <img src="https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690737168/Screenshot_2023-07-30_at_20.10.58-removebg-preview_fqwvr0.png" />
      <nav class="homepage-navbar"></nav>
    </div>
    <div class="right-nav">
      <a href="#/login" class="nav-link">Log in</a>
      <RouterLink to="/board" class="nav-link-signup nav-link">Try Mellow!</RouterLink>
    </div>
  </header>
  <main></main>
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
