<template>
  <header ref="header" class="header-container">
    <nav>
      <RouterLink to="/board">
        <img src="https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690982880/Screenshot_2023-08-02_at_16.27.27_t0v0qv.png" alt="logo" />
      </RouterLink>
      <div class="nav-left-content">
        <button class="nav-button">
          <span class="btn-title">Boards</span>
          <span class="nav-arrow-down">
            <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        </button>
        <button class="nav-button">
          <span>Recent</span>
          <span class="nav-arrow-down">
            <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        </button>
        <button class="nav-button">
          <span>Starred</span>
          <span class="nav-arrow-down">
            <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        </button>
        <div class="create-menu">
          <button class="create-menu-button" ref="createBoardAppHeader" @click="openModal('CreateBoardModal')"><p>Create</p></button>
        </div>
      </div>
      <div class="nav-right-content">
        <div class="search-box">
          <span class="magnifying-glass">
            <svg width="20" height="20" viewBox="0 0 24 24" role="presentation">
              <path d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z" fill="currentColor" fill-rule="evenodd"></path>
            </svg>
          </span>
          <input type="text" placeholder="Search" ref="input" />
        </div>
        <div class="nav-right-content-buttons">
          <span class="notification-button">
            <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
              <path
                d="M6.586 17.829a2 2 0 002.829 0L6.585 15a2 2 0 000 2.829zm4.798-12.351A5.036 5.036 0 0114.954 4c.972 0 1.945.28 2.788.839.02-.026.043-.05.066-.074a1.01 1.01 0 111.354 1.494 5.048 5.048 0 01-.64 6.356l-.725.725c-.782.783-1.813 2.21-2.312 3.207l-1.509 3.016c-.249.5-.773.584-1.171.187l-8.556-8.555c-.397-.397-.308-.924.187-1.172l3.017-1.508c.989-.494 2.42-1.526 3.206-2.312l.725-.725zm2.739 9.63c.517-.975 1.568-2.396 2.354-3.182l.725-.726a3.048 3.048 0 00.387-3.835c-.19-.286-.718-.766-.859-.86A3.043 3.043 0 0015.047 6a3.04 3.04 0 00-2.156.892l-.95.951c-.784.785-2.219 1.82-3.201 2.311l-1.74.87 6.07 6.069 1.053-1.985z"
                fill="currentColor"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
          <span class="dark-mode-button">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 20V4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          <span class="user-account-button">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.5048 5.67168C11.9099 5.32669 11.2374 5.10082 10.5198 5.0267C11.2076 3.81639 12.5085 3 14 3C16.2092 3 18 4.79086 18 7C18 7.99184 17.639 8.89936 17.0413 9.59835C19.9512 10.7953 22 13.6584 22 17C22 17.5523 21.5523 18 21 18H18.777C18.6179 17.2987 18.3768 16.6285 18.0645 16H19.917C19.4892 13.4497 17.4525 11.445 14.8863 11.065C14.9608 10.7218 15 10.3655 15 10C15 9.58908 14.9504 9.18974 14.857 8.80763C15.5328 8.48668 16 7.79791 16 7C16 5.89543 15.1046 5 14 5C13.4053 5 12.8711 5.25961 12.5048 5.67168ZM10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12ZM14 10C14 10.9918 13.639 11.8994 13.0412 12.5984C15.9512 13.7953 18 16.6584 18 20C18 20.5523 17.5523 21 17 21H3C2.44772 21 2 20.5523 2 20C2 16.6584 4.04879 13.7953 6.95875 12.5984C6.36099 11.8994 6 10.9918 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10ZM9.99999 14C12.973 14 15.441 16.1623 15.917 19H4.08295C4.55902 16.1623 7.02699 14 9.99999 14Z"
                fill="currentColor"
              ></path>
            </svg>
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
</template>
<script>
import { eventBus } from '../services/event-bus.service'

export default {
  name: 'AppHeader',
  data() {
    return {
      bgImg: '',
      elRef: '',
      type: ''
    }
  },
  created() {
    // eventBus.on('backgroundChange', () => {
    //   this.getAverageColor()
    // })
    this.getAverageColor()
  },

  watch: {
    '$route.path'(newPath) {
      if (newPath === '/board') {
        this.$refs.header.style.backgroundColor = 'red'
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

        const rgbColor = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`
        this.$refs.header.style.backgroundColor = rgbColor
      }
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
  components: {},
}
</script>
