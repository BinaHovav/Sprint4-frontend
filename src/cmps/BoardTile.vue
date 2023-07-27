<template>
  <RouterLink :to="'/board/' + board._id">
    <div class="board-tile">
      <img :src="board.imgUrl" alt="Board Image" class="board-image" />
      <span class="board-title">{{ board.title }}</span>
    </div>
  </RouterLink>
  <button @click.stop="updateBoard(board._id)">
    <span class="btn-star-board"></span>
  </button>
</template>

<script>
// import BoardIndex from '../views/BoardIndex.vue'
export default {
  name: 'BoardTile',
  emits: ['loadBoard', 'updateBoard'],
  props: ['board'],
  data() {
    return {}
  },
  computed: {},
  created() { },
  methods: {
    updateBoard(boardId) {
      console.log('boardId', boardId)
      this.$emit('updateBoard', boardId)
    },
  },
  components: {},
}
</script>
