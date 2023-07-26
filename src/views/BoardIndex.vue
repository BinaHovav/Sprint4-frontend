<template>
  <div class="container board-index">
    <ul class="board-list" v-for="board in boards" :key="board._id">
      <li @click="loadBoard(board)">
        {{ board.title }}
        <button @click.stop="updateBoard(board._id)">star</button>
      </li>
    </ul>
    <button class="new-board" @click="addBoard">Create new board</button>
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { boardService } from '../services/board.service.local'
import { getActionUpdateBoard, getActionAddBoard } from '../store/board.store'
export default {
  data() {
    return {
      // boardToAdd: boardService.getEmptyBoard(),
    }
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
  },
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },
  methods: {
    async loadBoard(board) {
      try {
        console.log('board',board);
        this.$router.push(`/board/${board._id}`)
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot load board')
      }
    },
    async addBoard() {
      const newBoard = boardService.getEmptyBoard()
      newBoard.title = prompt('board title please')
      try {
        const addedBoard = await this.$store.dispatch(getActionAddBoard(newBoard))
        showSuccessMsg('Board added')
        this.$router.push(`/board/${addedBoard.id}`)
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add board')
      }
    },
    async updateBoard(boardId) {
      const board = this.boards.find((board) => board.id === boardId)
      const boardToUpdate = JSON.parse(JSON.stringify(board))
      boardToUpdate.isStarred = true
      try {
        await this.$store.dispatch(getActionUpdateBoard(boardToUpdate))
        showSuccessMsg('Board updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update board')
      }
    },
  },
}
</script>
