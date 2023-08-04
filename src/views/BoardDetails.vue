<template>
  <section v-if="board" class="board-details-container flex column" :style="{ backgroundImage: `url(${board?.imgUrl})` }">
    <TopNavbar :board="this.board" @openMenu="onShowMenu" @updateBoard="updateBoard" :isMenuOpen="isMenuOpen" />
    <RightMenu @closeMenu="onCloseMenu" :showMenu="showMenu" :board="this.board" @updateBoard="updateBoard" />
    <GroupList :groups="boardToDisplay?.groups" @removeGroup="removeGroup" @addGroup="addGroup" @updateGroup="updateGroup"
      @updateGroups="updateGroups" />
  </section>
  <RouterView @updateBoard="updateBoard" />
</template>

<script>
import TopNavbar from '../cmps/TopNavbar.vue'
import GroupList from '../cmps/GroupList.vue'
import RightMenu from '../cmps/RightMenu.vue'

// import { boardService } from '../services/board.service.local'
import { boardService } from '../services/board.service'
import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionUpdateBoard } from '../store/board.store'
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_UPDATE_BOARD } from '../services/socket.service'

export default {
  name: 'BoardDetails',
  data() {
    return {
      board: null,
      showMenu: false,
      isMenuOpen: ''
    }
  },
  computed: {
    boardToDisplay() {
      return this.$store.getters.getCurrBoard
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    }
  },
  async created() {
    await this.setBoard()
    socketService.emit(SOCKET_EMIT_SET_TOPIC, this.board._id)
    // socketService.on(SOCKET_EVENT_UPDATE_BOARD, ()=> {
    //   console.log('updating-board');
    //   this.setBoard()
    // })



    eventBus.on('setActivity', (action = { type: '', txt: '', componentId: '', movedCmp: '', movedUser: '' }) => {
      console.log(action);
      const activity = boardService.getEmptyActivity()
      activity.action = action
      activity.by = this.loggedinUser.fullname
      this.board.activities.unshift(activity)
      this.updateBoard()
      console.log(this.board.activities);
    })
  },
  unmounted() {
    eventBus.off('setActivity')
  },
  methods: {
    onShowMenu() {
      this.isMenuOpen = 'menu-open'
      this.showMenu = true
    },
    onCloseMenu() {
      this.isMenuOpen = ''
      this.showMenu = false
    },

    async setBoard() {
      try {
        const boardId = this.$route.params.id
        this.board = await boardService.getById(boardId)
        this.$store.commit({ type: 'setCurrBoardId', boardId: boardId })
        this.$store.commit({ type: 'setCurrLabels', labels: this.board.labels })
        this.$store.commit({ type: 'setBackgroundImg', backgroundImg: this.board?.imgUrl })
        if (!this.loggedinUser) this.$store.commit({ type: 'setGuestMode' })
      } catch (err) {
        showErrorMsg('Cannot load board')
      }
    },
    async updateBoard(updatedBoard = this.board, action = '') {
      if (action) {
        const activity = this.getActivity(action)
        updatedBoard.activities.unshift(activity)
      }
      try {
        await this.$store.dispatch(getActionUpdateBoard(updatedBoard))
        this.board = updatedBoard
      } catch (err) {
        showErrorMsg('Cannot update board')
      }
    },
    async removeGroup(groupId) {
      const group = this.board.groups.find(group => groupId === group.id)
      const action = { type: 'archived', txt: `list ${group.title}`, componentId: '', movedCmp: '', movedUser: '' }
      const activity = this.getActivity(action)
      this.board.activities.unshift(activity)

      const idx = this.board.groups.findIndex((group) => group.id === groupId)
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

      const action = { type: 'added', txt: `${title} to this board`, componentId: '', movedCmp: '', movedUser: '' }
      const activity = this.getActivity(action)
      this.board.activities.unshift(activity)

      try {
        await this.$store.dispatch(getActionUpdateBoard(this.board))
      } catch (err) {
        showErrorMsg('Cannot add group')
      }
    },
    async updateGroup(groupToEdit, action = '') {
      const idx = this.board.groups.findIndex((group) => group.id === groupToEdit.id)
      this.board.groups.splice(idx, 1, groupToEdit)

      if (action) {
        const activity = this.getActivity(action)
        this.board.activities.unshift(activity)
      }
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
    getActivity(action) {
      const activity = boardService.getEmptyActivity()
      activity.by = this.loggedinUser
      activity.action = action
      return activity
    }
  },

  components: {
    TopNavbar,
    GroupList,
    RightMenu,
  },
}
</script>
