<template>
  <ul class="board-list">
    <li v-for="board in boards" :key="board._id" @click="loadBoard(board._id)">
      <BoardTile :board="board" @updateBoard="updateBoard" @loadBoard="loadBoard" />
    </li>
  </ul>
</template>

<script>
import BoardTile from './BoardTile.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { boardService } from '../services/board.service.local'
import { getActionUpdateBoard, getActionAddBoard } from '../store/board.store'

export default {
  name: 'BoardList',
  props: ['boards'],
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    loadBoard(boardId) {
      this.$emit('loadBoard', boardId)
    },
    async addBoard() {
      const newBoard = boardService.getEmptyBoard()
      newBoard.title = this.newBoardTitle
      try {
        const addedBoard = await this.$store.dispatch(getActionAddBoard(newBoard))
        showSuccessMsg('Board added')
        this.$router.push(`/board/${addedBoard._id}`)
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add board')
      }
    },
    updateBoard(boardId) {
      // console.log('boardId', boardId)
      this.$emit('updateBoard', boardId)
    },
  },
  components: {
    BoardTile,
  },
}
</script>
