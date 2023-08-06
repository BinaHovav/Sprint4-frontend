<template>
  <section class="board-header">
    <nav :class="isMenuOpen">
      <span class="left-board-header">
        <div class="board-title">
          <form action="">
            <textarea v-model="board.title" rows="1" ref="boardNameInput" class="board-title"
              @blur="updateBoardTitle(board)" @keydown.enter.prevent="updateBoardTitle(board)"></textarea>
          </form>
        </div>
        <button class="btn-star-container" @click.prevent="updateBoard(board)">
          <span class="star-icon">
            <span :class="boardClass"></span>
          </span>
        </button>
      </span>

      <span class="right-board-header">
        <div class="board-members">
          <div class="board-members-item" v-for="member in membersToShow">
            <img :src="member.imgUrl" alt="member" />
          </div>
          <span class="members-count" v-if="membersCount"> +{{ membersCount }}</span>
        </div>
        <button class="open-menu-btn" :class="isMenuOpen" @click="openRightNav"></button>
      </span>
    </nav>
  </section>
</template>

<script>
import RightMenu from './RightMenu.vue'

export default {
  name: 'TopNavbar',
  props: ['board', 'isMenuOpen'],
  data() {
    return {
      screenWidth: window.innerWidth
    }
  },
  created() {
    this.getAverageColor()
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth
    })
  },
  unmounted() {
    window.removeEventListener('resize')
  },
  methods: {
    updateBoard(board) {
      this.board.isStarred = !this.board.isStarred
      this.$emit('updateBoard', board)
    },
    updateBoardTitle(board) {
      const action = { type: 'renamed', txt: `this board (from ${board.title})`, componentId: '', movedCmp: '', movedUser: '' }
      this.$emit('updateBoard', board, action)
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
    membersToShow() {
      const membersToShow = []
      let counter = 0
      const memberLimit = this.screenWidth > 740 ? 5 : 3
      this.board.members.forEach(member => {
        counter++
        if (counter <= memberLimit) membersToShow.push(member)
      })
      return membersToShow
    },
    membersCount() {
      const memberLimit = this.screenWidth > 740 ? 5 : 3
      return this.board.members.length > memberLimit ? this.board.members.length - memberLimit : ''
    }
  },
  components: {
    RightMenu,
  },
}
</script>
