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
          <RightMenu :board="board" />
          <button class="open-menu-btn" @click="openRightNav"></button>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import RightMenu from './RightMenu.vue'
import ColorThief from 'colorthief'

export default {
  name: 'TopNavbar',
  props: ['board'],
  data() {
    return {}
  },
  created() {
    this.getDominantColor()
  },
  methods: {
    openRightNav() {
      document.getElementById('mySidenav').style.width = '335px'
    },
    closeRightNav() {
      document.getElementById('mySidenav').style.width = '0'
    },
    getDominantColor() {
      const img = new Image()
      img.src = this.board?.imgUrl
      img.crossOrigin = 'Anonymous'

      img.onload = () => {
        const colorThief = new ColorThief()
        const dominantColor = colorThief.getColor(img)

        // Now you can apply the dominant color to the TopNavbar background
        const rgbColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.5)`
        this.$el.style.backgroundColor = rgbColor
      }
    },
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
