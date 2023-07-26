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
    <div>
      <GroupList :groups="board?.groups" />
    </div>
    
  </section>
  <RouterView />
</template>

<script>
import GroupList from './GroupList.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionSetCurrBoard } from '../store/board.store'


export default {
  name: 'BoardDetails',
  data() {
    return {

    }
  },
  computed: {
    board() {
      return this.$store.getters.currBoard

    },
  },
  created() {
    this.setBoard()
  },
  methods: {
    async setBoard() {
      try {
        const boardId = this.$route.params.id
        await this.$store.dispatch(getActionSetCurrBoard(boardId))
        showSuccessMsg('Board loaded')
      } catch (err) {
        showErrorMsg('Cannot load board')
      }
    },
  },

  components: {
    GroupList
  }
}
</script>
