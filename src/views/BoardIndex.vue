<template>
  <section class="container board-index" v-if="board">
    <ul class="board-list">
      <li v-for="board in boards" :key="board._id" @click="loadBoard(board._id)">
        {{ board.title }}
        <button @click.stop="updateBoard(board.id)">
          <span class="btn-star-board"></span>
        </button>
      </li>
      <li class="create-new-board" @click="openModal">Create new board</li>
    </ul>
    <div v-if="showModal" class="create-board-modal">
      <div class="create-modal-content">
        <button @click="closeModal" class="exit-btn">X</button>
        <input v-model="newBoardTitle" type="text" placeholder="Board title" />
        <button @click="addBoard" class="create-btn">Create</button>
      </div>
    </div>
  </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { boardService } from '../services/board.service.local'
import { getActionUpdateBoard, getActionAddBoard } from '../store/board.store'
export default {
  data() {
    return {
      board: {},
      showModal: false,
      newBoardTitle: '',
    }
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
  },
  created() {},
  methods: {
    async loadBoard(boardId) {
      try {
        this.$router.push(`/board/${boardId}`)
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot load board')
      }
    },
    openModal() {
      this.showModal = true
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
    closeModal() {
      this.showModal = false
      this.newBoardTitle = ''
    },
  },
}
</script>
