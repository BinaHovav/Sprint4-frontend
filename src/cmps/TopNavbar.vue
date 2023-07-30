<template>
  <section class="top-navbar">
    <nav class="flex justify-space-between">
      <div class="left-board-nav">
        <div class="board-title">
          <h1 class="fs18">{{ boardToDisplay?.title }}</h1>
        </div>
        <button class="btn-star"><span class="star"></span></button>
      </div>
      <!-- <span>filter</span> -->
      <div>
        <div class="right-board-nav">
          <div class="board-members" v-for="member in boardToDisplay?.members">
            <div><img :src="member.imgUrl" alt="member" /></div>
          </div>
          <RightMenu :board="board" @updateBoard="this.$emit('updateBoard', this.board)" />
          <button class="open-menu-btn" @click="openRightNav"></button>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import RightMenu from './RightMenu.vue'

export default {
  name: 'TopNavbar',
  props: ['board'],
  data() {
    return {}
  },
  created() {
    // this.getDominantColor()
    this.getAverageColor()
  },
  methods: {
    openRightNav() {
      document.getElementById('mySidenav').style.width = '335px'
    },
    closeRightNav() {
      document.getElementById('mySidenav').style.width = '0'
    },
    getAverageColor() {
      const img = new Image()
      img.src = this.board?.imgUrl
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

        // Now you can apply the average color to the TopNavbar background
        const rgbColor = `rgba(${averageRed}, ${averageGreen}, ${averageBlue},0.2)`
        this.$el.style.backgroundColor = rgbColor
      }
    },
    // getDominantColor() {
    //   const img = new Image()
    //   img.src = this.board?.imgUrl
    //   img.crossOrigin = 'Anonymous'

    //   img.onload = () => {
    //     const colorThief = new ColorThief()
    //     const dominantColor = colorThief.getColor(img)

    //     // Now you can apply the dominant color to the TopNavbar background
    //     const rgbColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.5)`
    //     this.$el.style.backgroundColor = rgbColor
    //   }
    // },
  },
  computed: {
    boardToDisplay() {
      return this.$store.getters.getCurrBoard
    },
  },
  components: {
    RightMenu,
  },
}
</script>
