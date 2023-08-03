<template>
  <ul class="board-list">
    <li v-for="board in boards" :key="board._id" @click="loadBoard(board._id)">
      <BoardTile :board="board" :isStarred="board.isStarred" @updateBoard="updateBoard" @loadBoard="loadBoard" />
    </li>
    <div v-if="showCreateBoard" ref="createBoard" class="create-new-board" @click="openModal('CreateBoardModal', 'createBoard')">Create new board</div>
  </ul>
</template>

<script>
import BoardTile from './BoardTile.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { boardService } from '../services/board.service.local'
import { getActionUpdateBoard, getActionAddBoard } from '../store/board.store'
import { eventBus } from '../services/event-bus.service'

export default {
  name: 'BoardList',
  props: ['boards', 'showCreateBoard'],
  data() {
    return {
      newBoardTitle: '',
    }
  },
  computed: {},
  created() {},
  methods: {
    loadBoard(boardId) {
      this.$emit('loadBoard', boardId)
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
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update board')
      }
    },
    openModal(type, elRef) {
      // const board = JSON.parse(JSON.stringify(this.board))
      // const info = { board }
      const el = this.$refs.createBoard.getBoundingClientRect()
      console.log(el)
      eventBus.emit('modal', { el, type })
      window.addEventListener('resize', this.handleResize)
      // document.removeEventListener('click', this.handleClickOutside)
    },
    handleResize() {
      const el = this.$refs.createBoard.getBoundingClientRect()
      eventBus.emit('modal', { el })
    },

    closeModal() {
      this.newBoardTitle = ''
    },
  },
  components: {
    BoardTile,
  },
}
</script>
