<template>
  <header ref="header" class="header-container">
    <nav>
      <RouterLink to="/board">
        <img src="https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691058928/image-removebg-preview_thzggs.png" alt="logo" />
      </RouterLink>
      <div class="nav-left-content">
        <button class="nav-button">
          <span class="btn-title">Boards</span>
          <span class="nav-arrow-down">
            <span v-icon="'arrowDownSmall'"></span>
          </span>
        </button>
        <button class="nav-button">
          <span>Recent</span>
          <span class="nav-arrow-down">
            <span v-icon="'arrowDownSmall'"></span>
          </span>
        </button>
        <button class="nav-button">
          <span>Starred</span>
          <span class="nav-arrow-down">
            <span v-icon="'arrowDownSmall'"></span>
          </span>
        </button>
        <div class="create-menu">
          <button class="create-menu-button" ref="createBoardAppHeader" @click="openModal('CreateBoardModal')"><p>Create</p></button>
        </div>
      </div>
      <div class="nav-right-content">
        <!-- <div class="search-box">
          <span class="magnifying-glass">
            <span v-icon="'searchIcon'"></span>
          </span>
          <input type="text" placeholder="Search" ref="input" />
        </div> -->
        <div class="nav-right-content-buttons">
          <!-- <span class="notification-button">
            <span v-icon="'notification'"></span>
          </span>
          <span class="dark-mode-button"> -->
          <!-- <span v-icon="'darkModeButton'"></span> -->
          <!-- </span> -->
          <span v-if="!loggedInUser" class="user-account-button" @click="toggleUserDetails">
            <span v-icon="'userButton'"></span>
          </span>
          <span v-else class="user-account-button" @click="toggleUserDetails">
            <img :src="loggedInUser.imgUrl" alt="user" />
          </span>
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
  <UserDetails v-if="showUserDetails" @toggleUserDetails="toggleUserDetails" />
</template>
<script>
import { eventBus } from '../services/event-bus.service'
import UserDetails from './ModalTypes/UserDetails.vue'

export default {
  name: 'AppHeader',
  data() {
    return {
      bgImg: '',
      showUserDetails: false,
      elRef: '',
      type: '',
    }
  },
  created() {
    eventBus.on('backgroundChange', () => {
      this.getAverageColor()
    })
    this.getAverageColor()
  },

  watch: {
    '$route.path'(newPath) {
      if (newPath === '/board') {
        this.$refs.header.style.backgroundColor = 'white'
        this.$refs.input.style.backgroundColor = 'lightgray'
      }
    },
    board: function (newValue) {
      if (this.bgImg !== newValue.imgUrl) this.bgImg = newValue.imgUrl
      this.getAverageColor()
    },
  },

  methods: {
    openModal(type) {
      this.type = type
      const el = this.$refs.createBoardAppHeader.getBoundingClientRect()
      eventBus.emit('modal', { el, type })
      window.addEventListener('resize', this.handleResize)
      eventBus.on('setInfo', () => {
        window.removeEventListener('resize', this.handleResize)
        eventBus.off('setInfo')
        this.type = ''
      })
    },
    handleResize() {
      const el = this.$refs.createBoardAppHeader.getBoundingClientRect()
      eventBus.emit('modal', { el, type: this.type, info: 'resize' })
    },
    getAverageColor() {
      const img = new Image()
      img.src = this.bgImg
      img.crossOrigin = 'Anonymous'

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, img.width, img.height)
        const data = imageData.data

        let totalRed = 0
        let totalGreen = 0
        let totalBlue = 0

        for (let i = 0; i < data.length; i += 4) {
          totalRed += data[i]
          totalGreen += data[i + 1]
          totalBlue += data[i + 2]
        }
        const pixelCount = data.length / 4
        const averageRed = Math.floor(totalRed / pixelCount)
        const averageGreen = Math.floor(totalGreen / pixelCount)
        const averageBlue = Math.floor(totalBlue / pixelCount)

        const rgbColor = `rgba(${averageRed}, ${averageGreen}, ${averageBlue},0.2)`
        this.$refs.header.style.backgroundColor = rgbColor
      }
    },
    toggleUserDetails() {
      this.showUserDetails = !this.showUserDetails
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    board() {
      return this.$store.getters.getCurrBoard
    },
  },
  components: {
    UserDetails,
  },
}
</script>
