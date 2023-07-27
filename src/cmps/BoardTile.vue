<template>
  <div class="board-tile" @click="loadBoard(board._id)">
    <img :src="board.imgUrl" alt="Board Image" class="board-image" />
    <span class="board-title">{{ board.title }}</span>
  </div>
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
  created() {},
  methods: {
    loadBoard(boardId) {
      this.$emit('loadBoard', boardId)
    },
    updateBoard(boardId) {
      console.log('boardId', boardId)
      this.$emit('updateBoard', boardId)
    },
  },
  components: {},
}
</script>
