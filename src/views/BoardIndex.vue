<template>
  <div class="home-container" v-if="boards">
    <div class="home-sticky-container">
      <nav class="home-left-sidebar-container"></nav>
      <div class="all-boards">
        <div class="content-all-boards">
          <div class="board-category-title">
            <span class="star"></span>
            <h3>Starred boards</h3>
          </div>
          <BoardList :boards="starredBoards" :showCreateBoard="false" />
          <div class="board-category-title">
            <span class="member"></span>
            <!-- <h3>Recently viewed</h3> -->
            <h3>Your boards</h3>
          </div>
        </div>
        <BoardList :boards="boards" :showCreateBoard="true" />
      </div>
      <nav class="home-right-sidebar-container"></nav>
    </div>
  </div>
</template>

<script>
import BoardList from '../cmps/BoardList.vue'
import { boardService } from '../services/board.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionUpdateBoard, getActionAddBoard } from '../store/board.store'

export default {
  data() {
    return {}
  },
  computed: {
    starredBoards() {
      return this.$store.getters.boards.filter((board) => board.isStarred)
    },

    boards() {
      return this.$store.getters.boards
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },

  created() {
    if (!this.loggedinUser) this.$store.dispatch({ type: 'login', userCred: { username: 'Guest', password: '123' } })
  },
  methods: {},
  components: {
    BoardList,
  },
}
</script>
