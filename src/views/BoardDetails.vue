<template>
  <section v-if="board" class="board-details-container flex column" :style="{ backgroundImage: `url(${board?.imgUrl})` }">
    <TopNavbar :board="this.board" @openMenu="onShowMenu" @updateBoard="updateBoard" />
    <RightMenu @closeMenu="onCloseMenu" :showMenu="showMenu" :board="this.board" @updateBoard="this.$emit('updateBoard', this.board)" />
    <GroupList :groups="boardToDisplay?.groups" @removeGroup="removeGroup" @addGroup="addGroup" @updateGroup="updateGroup" @updateGroups="updateGroups" />
  </section>
  <RouterView @updateBoard="updateBoard" />
</template>

<script>
import TopNavbar from '../cmps/TopNavbar.vue'
import GroupList from '../cmps/GroupList.vue'
import RightMenu from '../cmps/RightMenu.vue'

import { boardService } from '../services/board.service.local'
// import { boardService } from '../services/board.service'
import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionUpdateBoard } from '../store/board.store'

export default {
  name: 'BoardDetails',
  data() {
    return {
      board: null,
      showMenu: false,
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
    onShowMenu() {
      this.showMenu = true
    },
    onCloseMenu() {
      this.showMenu = false
    },
    async setBoard() {
      try {
        const boardId = this.$route.params.id
        this.board = await boardService.getById(boardId)
        this.$store.commit({ type: 'setCurrBoardId', boardId: boardId })
        this.$store.commit({ type: 'setCurrLabels', labels: this.board.labels })
        this.$store.commit({ type: 'setBackgroundImg', backgroundImg: this.board?.imgUrl })
      } catch (err) {
        showErrorMsg('Cannot load board')
      }
    },
    async updateBoard(updatedBoard = this.board) {
      try {
        await this.$store.dispatch(getActionUpdateBoard(updatedBoard))
        this.board = updatedBoard
      } catch (err) {
        showErrorMsg('Cannot update board')
      }
    },
    async removeGroup(groupId) {
      const idx = this.board.groups.findIndex((group) => group.id === groupId)
      // const activity = this.$store.getters.getEmptyActivity
      // activity.action.type='removed-group'
      // activity.action.txt=`removed group ${this.board.groups[idx].title}`
      // this.board.activitys.unshift(activity)
      this.board.groups.splice(idx, 1)

      try {
        await this.$store.dispatch(getActionUpdateBoard(this.board))
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
      } catch (err) {
        showErrorMsg('Cannot add group')
      }
    },
    async updateGroup(groupToEdit) {
      const idx = this.board.groups.findIndex((group) => group.id === groupToEdit.id)
      this.board.groups.splice(idx, 1, groupToEdit)
      try {
        await this.$store.dispatch(getActionUpdateBoard(this.board))
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
    TopNavbar,
    GroupList,
    RightMenu,
  },
}
</script>
