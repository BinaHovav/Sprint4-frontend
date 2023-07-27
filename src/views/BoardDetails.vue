<template>
  <section class="board-details-container flex column">
    <nav class="flex justify-space-between align-center">
      <div class="board-title">
        <h1 class="fs18">{{ board?.title }}</h1>
      </div>
      <button class="btn-star"><span class="star"></span></button>
      <span>filter</span>
      <span>users</span>
      <span>menu</span>
    </nav>
    <!-- <div> -->
      <GroupList :groups="board?.groups" @removeGroup="removeGroup" @addGroup="addGroup" @updateGroup="updateGroup" />
    <!-- </div> -->
    
  </section>
  <RouterView @updateBoard="updateBoard"/>
</template>

<script>
import GroupList from './GroupList.vue'
import { boardService } from '../services/board.service.local'
// import { boardService } from '../services/board.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionUpdateBoard } from '../store/board.store'


export default {
  name: 'BoardDetails',
  data() {
    return {
      board: null
    }
  },
  computed: {
  },
  created() {
    this.setBoard()
  },
  methods: {
    async setBoard() {
      try {
        const boardId = this.$route.params.id
        this.board = await boardService.getById(boardId)
        this.$store.commit({ type: 'setCurrBoardId', boardId: this.board._id })
        this.$store.commit({ type: 'setCurrLabels', labels: this.board.labels })
        showSuccessMsg('Board loaded')
      } catch (err) {
        showErrorMsg('Cannot load board')
      }
    },
    async removeGroup(groupId) {
      const idx = this.board.groups.findIndex(group => group.id === groupId)
      this.board.groups.splice(idx, 1)
      try {
        await this.$store.dispatch(getActionUpdateBoard(this.board))
        showSuccessMsg('Group removed')
      } catch (err) {
        showErrorMsg('Cannot remove group')
      }
    },
    async addGroup(title) {
      const newGroup = boardService.getEmptyGroup()
      newGroup.title = title
      this.board.groups.push(newGroup)
      try {
        await this.$store.dispatch(getActionUpdateBoard(this.board))
        showSuccessMsg('Group added')
      } catch (err) {
        showErrorMsg('Cannot add group')

      }
    },
    async updateGroup(groupToEdit) {
      const idx = this.board.groups.findIndex(group => group.id === groupToEdit.id)
      const groupToUpdate = this.board.groups.find(group => group.id === groupToEdit.id)
      this.board.groups.splice(idx, 1, groupToUpdate)
      try {
        await this.$store.dispatch(getActionUpdateBoard(this.board))
        showSuccessMsg('Group updated')
      } catch (err) {
        showErrorMsg('Cannot update group')

      }
    },
    async updateBoard(updatedBoard) {
      try {
        await this.$store.dispatch(getActionUpdateBoard(updatedBoard))
        showSuccessMsg('Group updated')
        this.board = updatedBoard
      } catch (err) {
        showErrorMsg('Cannot update group')

      }
    }
  },


  components: {
    GroupList,
    boardService
  }
}
</script>
