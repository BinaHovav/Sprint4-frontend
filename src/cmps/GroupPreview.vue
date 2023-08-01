<template>
  <div class="group-preview-container">
    <div class="group-header drag-me">
      <form action="">
        <textarea v-model="clonedGroup.title" rows="1" ref="groupNameInput" class="task-title" @blur="updateGroup" @keydown.enter.prevent="updateGroup"></textarea>
      </form>
      <button class="btn-three-dots" ref="listActions" @click="openModal('ListActions', 'listActions')"><span class="three-dots"></span></button>
    </div>
    <TaskList :tasks="group.tasks" :groupId="group.id" @removeTask="removeTask" @updateTasks="updateTasks" :add="add" @changeAdd="add = !add" @addTask="addTask" />

    <div v-if="!add" class="open-card-compose">
      <a @click="openadd">
        <span class="btn-plus"></span>
        <span class="add-txt"> Add a card</span>
      </a>
    </div>
  </div>
</template>

<script>
import { boardService } from '../services/board.service.local'
import TaskList from './TaskList.vue'
import { eventBus } from '../services/event-bus.service'
export default {
  name: 'GroupPreview',
  props: ['group'],
  data() {
    return {
      clonedGroup: null,
      add: false,
      title: '',
    }
  },
  computed: {
    board() {
      return this.$store.getters.getCurrBoard
    },
  },
  created() {},
  watch: {
    group: {
      handler() {
        this.clonedGroup = JSON.parse(JSON.stringify(this.group))
      },
      immediate: true,
    },
  },
  methods: {
    updateGroup() {
      this.$emit('updateGroup', this.clonedGroup)
      this.$refs.groupNameInput.blur()
    },
    addTask(title) {
      this.add = false
      const newTask = boardService.getEmptyTask()
      newTask.title = title
      this.clonedGroup.tasks.push(newTask)
      this.updateGroup()
    },
    removeTask(taskId) {
      const idx = this.clonedGroup.tasks.findIndex((task) => task.id === taskId)
      this.clonedGroup.tasks.splice(idx, 1)
      this.updateGroup()
    },
    updateTasks(tasks, groupId) {
      this.$emit('updateTasks', tasks, groupId)
    },
    openadd() {
      this.add = true
      setTimeout(() => {
        window.removeEventListener('resize', this.handleResize)
      }, 100)
    },
    openModal(type, elRef) {
      eventBus.on('setInfo', (info) => {
        if (info?.removeGroup) {
          this.$emit('removeGroup', info.removeGroup)
          eventBus.off('setInfo')
        }
        // this.$emit('removeGroup', info.removeGroup)
      })
      const board = JSON.parse(JSON.stringify(this.board))
      const info = { group: this.group, board }
      const el = this.$refs[elRef].getBoundingClientRect()
      eventBus.emit('modal', { el, type, info })
      window.addEventListener('resize', this.handleResize)
    },
    handleResize() {
      const el = this.$refs.listActions.getBoundingClientRect()
      eventBus.emit('modal', { el })
    },
  },
  components: {
    TaskList,
  },
}
</script>
