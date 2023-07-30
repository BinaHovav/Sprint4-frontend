<template>
  <div class="board-tile">
    <RouterLink :to="'/board/' + board._id">
      <img :src="board.imgUrl" alt="Image" class="board-image" />
      <span class="board-title">{{ board.title }}</span>
      <button class="btn-star-board" :class="boardClass" @click.prevent="updateBoard(board._id)" @mouseenter="showStar = true" @mouseleave="showStar = false"></button>
    </RouterLink>
  </div>
</template>

<script>
// import BoardIndex from '../views/BoardIndex.vue'
export default {
  name: 'BoardTile',
  emits: ['loadBoard', 'updateBoard'],
  props: ['board', 'isStarred'],
  data() {
    return {
      showStar: false,
    }
  },
  computed: {
    boardClass() {
      return {
        unstarred: !this.board.isStarred,
        starred: this.board.isStarred,
      }
    },
  },
  created() {},
  methods: {
    updateBoard(boardId) {
      this.$emit('updateBoard', boardId)
      this.board.isStarred = !this.board.isStarred
    },
  },
  components: {},
}
</script>
