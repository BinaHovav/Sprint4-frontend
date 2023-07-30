<template>
  <ul class="board-list">
    <li v-for="board in boards" :key="board._id" @click="loadBoard(board._id)">
      <BoardTile :board="board" :isStarred="board.isStarred" @updateBoard="updateBoard" @loadBoard="loadBoard" />
    </li>
    <div v-if="!showModal && showCreateBoard" class="create-new-board" @click="openModal">Create new board</div>
    <div v-if="showModal" class="create-board-modal">
      <div class="create-modal-content">
        <button @click="closeModal" class="exit-btn">X</button>
        <!--TODO: hey bina its tomer (: i think this should be a form and u cannot submit it until input is entered (required) -->
        <input v-model="newBoardTitle" type="text" placeholder="Board title" />
        <button @click="addBoard" class="create-btn">Create</button>
      </div>
    </div>
  </ul>
</template>

<script>
import BoardTile from './BoardTile.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { boardService } from '../services/board.service.local'
import { getActionUpdateBoard, getActionAddBoard } from '../store/board.store'

export default {
  name: 'BoardList',
  props: ['boards', 'showCreateBoard'],
  data() {
    return {
      showModal: false,
      newBoardTitle: '',
    }
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
    async updateBoard(boardId) {
      let board = this.boards.find((board) => board._id === boardId)
      if (!board) {
        board = this.starredBoards.find((board) => board._id === boardId)
      }
      const boardToUpdate = JSON.parse(JSON.stringify(board))
      boardToUpdate.isStarred = !boardToUpdate.isStarred
      try {
        await this.$store.dispatch(getActionUpdateBoard(boardToUpdate))
        // showSuccessMsg('Board updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update board')
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
    BoardTile,
  },
}
</script>
