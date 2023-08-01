<template>
  <section class="board-header">
    <nav>
      <span class="left-board-header">
        <div class="board-title">
          <form action="">
            <textarea v-model="board.title" rows="1" ref="boardNameInput" class="board-title" @blur="updateBoardTitle(board)" @keydown.enter.prevent="updateBoardTitle(board)"></textarea>
          </form>

          <!-- <h1 class="fs18">{{ boardToDisplay?.title }}</h1> -->
        </div>
        <button class="btn-star-container" @click.prevent="updateBoard(board)">
          <span class="star-icon">
            <span :class="boardClass"></span>
          </span>
        </button>
      </span>

      <span class="right-board-header">
        <div class="board-members">
          <div class="board-members-item" v-for="member in boardToDisplay?.members">
            <img :src="member.imgUrl" alt="member" />
          </div>
        </div>
        <button class="open-menu-btn" @click="openRightNav"></button>
      </span>
    </nav>
  </section>
</template>

<script>
import RightMenu from './RightMenu.vue'

export default {
  name: 'TopNavbar',
  props: ['board'],

  created() {
    this.getAverageColor()
  },
  methods: {
    updateBoard(board) {
      this.board.isStarred = !this.board.isStarred
      this.$emit('updateBoard', board)
    },
    updateBoardTitle(board) {
      this.$emit('updateBoard', board)
      this.$refs.boardNameInput.blur()
    },

    openRightNav() {
      this.$emit('openMenu')
    },
    closeRightNav() {
      document.getElementById('.board-menu').style.width = '0'
      // this.$refs.menu.style.width = '0'
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
  },
  computed: {
    boardToDisplay() {
      return this.$store.getters.getCurrBoard
    },
    boardClass() {
      return {
        unstarred: !this.board.isStarred,
        starred: this.board.isStarred,
      }
    },
  },
  components: {
    RightMenu,
  },
}
</script>
