<template>
  <header class="app-header">
    <nav>
      <div class="left-nav-app-header">
        <RouterLink to="/board">
          <img src="https://trello.com/assets/87e1af770a49ce8e84e3.gif" alt="logo" />
        </RouterLink>
        <div class="left-nav-btn">
          <span>Boards</span>
          <i class="fa fa-solid fa-chevron-down"></i>
        </div>
        <div class="left-nav-btn">
          <span>Recent</span>
          <i class="fa fa-solid fa-chevron-down"></i>
        </div>
        <div class="left-nav-btn">
          <span>Starred</span>
          <i class="fa fa-solid fa-chevron-down"></i>
        </div>
        <div class="left-nav-btn">
          <span>Create</span>
        </div>
      </div>
      <div class="right-nav-app-header">
        <div class="app-header-search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div class="right-nav-btn">
          <i class="fa-regular fa-bell"></i>
        </div>
        <div class="right-nav-btn">
          <i class="fa-regular fa-circle-question"></i>
        </div>
        <div class="right-nav-btn">
          <i class="fa-solid fa-circle-half-stroke"></i>
        </div>
        <div class="right-nav-btn">
          <i class="fa-regular fa-circle-user"></i>
        </div>
      </div>

      <!-- <RouterLink to="/login">Login / Signup</RouterLink>
      <section class="loggedin-user" v-if="loggedInUser">
        <RouterLink :to="`/user/${loggedInUser._id}`">
          {{ loggedInUser.fullname }}
        </RouterLink>
        <span>{{ loggedInUser.score?.toLocaleString() }}</span>
        <img :src="loggedInUser.imgUrl" /> -->
      <!-- </section> -->
    </nav>
  </header>
</template>
<script>
import ColorThief from 'colorthief'

export default {
  name: 'AppHeader',
  created() {
    this.getDominantColor()
  },
  watch: {
    backgroundImg: {
      handler() {
        this.getDominantColor()
      },
    },
  },
  methods: {
    getDominantColor() {
      const img = new Image()
      img.src = this.backgroundImg || ''
      img.crossOrigin = 'Anonymous'

      img.onload = () => {
        const colorThief = new ColorThief()
        const dominantColor = colorThief.getColor(img)

        // Now you can apply the dominant color to the TopNavbar background
        const rgbColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`
        this.$el.style.backgroundColor = rgbColor
      }
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    backgroundImg() {
      return this.$store.getters.boardImgUrl
    },
  },
  components: {},
}
</script>
