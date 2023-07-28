<template>
  <section class="container board-index" v-if="boards">
    <div class="board-category-title">
      <span class="star"></span>
      <h3>Starred boards</h3>
    </div>
    <BoardList :boards="starredBoards" @updateBoard="updateBoard" />
    <div class="board-category-title">
      <span class="clock"></span>
      <h3>Recently viewed</h3>
    </div>
    <BoardList :boards="boards" @updateBoard="updateBoard" />
    <div class="create-new-board" @click="openModal">Create new board</div>
    <div v-if="showModal" class="create-board-modal">
      <div class="create-modal-content">
        <button @click="closeModal" class="exit-btn">X</button>
        <!--TODO: hey bina its tomer (: i think this should be a form and u cannot submit it until input is entered (required) -->
        <input v-model="newBoardTitle" type="text" placeholder="Board title" />
        <button @click="addBoard" class="create-btn">Create</button>
      </div>
    </div>
  </section>
</template>

<script>
import BoardList from '../cmps/BoardList.vue'
import { boardService } from '../services/board.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionUpdateBoard, getActionAddBoard } from '../store/board.store'

export default {
  data() {
    return {
      showModal: false,
      newBoardTitle: '',
    }
  },
  computed: {
    starredBoards() {
      return this.$store.getters.boards.filter((board) => board.isStarred)
    },

    boards() {
      return this.$store.getters.boards.filter((board) => !board.isStarred)
    },
  },
  created() {},
  methods: {
    async updateBoard(boardId) {
      let board = this.boards.find((board) => board._id === boardId)
      if (!board) {
        board = this.starredBoards.find((board) => board._id === boardId)
      }
      const boardToUpdate = JSON.parse(JSON.stringify(board))
      boardToUpdate.isStarred = !boardToUpdate.isStarred
      try {
        await this.$store.dispatch(getActionUpdateBoard(boardToUpdate))
        showSuccessMsg('Board updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update board')
      }
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
    openModal() {
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
      this.newBoardTitle = ''
    },
  },
  components: {
    BoardList,
  },
}
</script>
