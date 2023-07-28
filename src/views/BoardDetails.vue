<template>
  <section class="board-details-container flex column">
    <nav class="flex justify-space-between align-center">
      <div class="board-title">
        <h1 class="fs18">{{ boardToDisplay?.title }}</h1>
      </div>
      <button class="btn-star"><span class="star"></span></button>
      <span>filter</span>
      <div>
        <div class="board-members" v-for="member in boardToDisplay?.members">
          <div><img :src=member.imgUrl alt="member"></div>
        </div>
      </div>
      <span>menu</span>
    </nav>
    <GroupList :groups="boardToDisplay?.groups" @removeGroup="removeGroup" @addGroup="addGroup" @updateGroup="updateGroup"
      @updateGroups="updateGroups" />

  </section>
  <RouterView @updateBoard="updateBoard" />
</template>

<script>
import GroupList from '../cmps/GroupList.vue'
import { boardService } from '../services/board.service.local'
// import { boardService } from '../services/board.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionUpdateBoard } from '../store/board.store'

export default {
  name: 'BoardDetails',
  data() {
    return {
      board: null,
    }
  },
  computed: {
    boardToDisplay() {
      return this.$store.getters.getCurrBoard
    },
  },
  created() {
    this.setBoard()
  },
  methods: {
    async setBoard() {
      try {
        const boardId = this.$route.params.id
        this.board = await boardService.getById(boardId)
        this.$store.commit({ type: 'setCurrBoardId', boardId: boardId })
        this.$store.commit({ type: 'setCurrLabels', labels: this.board.labels })
        showSuccessMsg('Board loaded')
      } catch (err) {
        showErrorMsg('Cannot load board')
      }
    },
    async updateBoard(updatedBoard = this.board) {
      try {
        await this.$store.dispatch(getActionUpdateBoard(updatedBoard))
        showSuccessMsg('Group updated')
        this.board = updatedBoard
      } catch (err) {
        showErrorMsg('Cannot update group')

      }
    },
    async removeGroup(groupId) {
      const idx = this.board.groups.findIndex((group) => group.id === groupId)
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
      this.board.groups.splice(idx, 1, groupToEdit)
      try {
        await this.$store.dispatch(getActionUpdateBoard(this.board))
        showSuccessMsg('Group updated')
      } catch (err) {
        showErrorMsg('Cannot update group')

      }
    },
    async updateGroups(groups) {
      this.board.groups = groups
      await this.updateBoard()
    },
  },

  components: {
    GroupList,
    boardService,
  },
}
</script>
