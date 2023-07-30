<template>
  <section class="container board-index" v-if="boards">
    <div class="board-category-title">
      <span class="star"></span>
      <h3>Starred boards</h3>
    </div>
    <BoardList :boards="starredBoards" :showCreateBoard="false" />
    <div class="board-category-title">
      <span class="clock"></span>
      <h3>Recently viewed</h3>
    </div>
    <BoardList :boards="boards" :showCreateBoard="true" />
  </section>
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
      return this.$store.getters.boards.filter((board) => !board.isStarred)
    },
  },
  created() {},
  methods: {},
  components: {
    BoardList,
  },
}
</script>
