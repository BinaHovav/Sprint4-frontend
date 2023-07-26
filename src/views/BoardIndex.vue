<template>
  <div class="container board-index">
    <ul class="board-list">
      <li v-for="board in boards" :key="board._id">
        <p>
          {{ board.title }}
        </p>
        <button @click="loadBoard(board)">Board</button>
      </li>
    </ul>
    <form @submit.prevent="addBoard()">
      <h2>Add board</h2>
      <input type="text" v-model="boardToAdd.title" />
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { boardService } from '../services/board.service.local'
import { getActionUpdateBoard } from '../store/board.store'
export default {
  data() {
    return {
      boardToAdd: boardService.getEmptyBoard(),
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
    async addBoard() {
      try {
        await this.$store.dispatch({ type: 'addBoard', board: this.boardToAdd })
        showSuccessMsg('Board added')
        this.boardToAdd = boardService.getEmptyBoard()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add board')
      }
    },

    async loadBoard(board) {
      try {
        this.$router.push('/board/:id')

        // board = { ...board }
        // await this.$store.dispatch(getActionUpdateBoard(board))
        // showSuccessMsg('Board updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot load board')
      }
    },
  },
}
</script>
