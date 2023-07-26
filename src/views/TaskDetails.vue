<template>
  <section class="backdrop">
    <section v-if="task" class="task-details">
      <a class="btn-icon-close" @click="onSaveTask"></a>
      <div class="task-cover" :class="task.cover">
        <div class="task-cover-menu">
          <a class="task-cover-btn">
            <span class="btn-icon-cover"></span>
            <span class="task-cover-txt">Cover</span>
          </a>
        </div>
      </div>
      <div class="task-header">
        <span class="btn-title-icon"></span>
        <div class="task-header-title">
          <textarea type="text" v-model="task.title"></textarea>
        </div>
      </div>
      <div class="task-main">
        <div class="task-details-data flex">
          <div class="task-details-members">Members:
            <template class="flex">
              <div v-for="member in task.members">{{ member.fullname }} |</div>
            </template>
          </div>
          <div class="task-details-labels">Labels:
            <template class="flex">
              <div v-for="labelId in task.labels" :class="getLabelColor(labelId)">{{ getLabelTitle(labelId) }} |</div>
            </template>
          </div>
          <div class="task-details-notifications">Notification:
            <template class="flex">
              <div v-for="member in task.members">{{ member.fullname }} |</div>
            </template>
          </div>
          <div class="task-details-notifications">Due date:
            <template class="flex">
              <div>{{ task.dueDate }}</div>
            </template>
          </div>
        </div>
        <div class="task-description flex column">
          Description
          <textarea v-model="task.description"></textarea>
        </div>
      </div>
      <div class="task-sidebar">
        <div class="task-sidebar-add">
          <h3 class="sidebar-add-txt">Add to card</h3>
          <a class="task-btn-link ">
            <span class="btn-link-members"></span>
            <span class="">Members</span>
          </a>
          <a class="task-btn-link ">
            <span class="btn-link-labels"></span>
            <span class="">Labels</span>
          </a>
          <a class="task-btn-link ">
            <span class="btn-link-checklist"></span>
            <span class="">Checklist</span>
          </a>
          <a class="task-btn-link ">
            <span class="btn-link-dates"></span>
            <span class="">Dates</span>
          </a>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { boardService } from '../services/board.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
export default {
  name: 'TaskDetails',
  data() {
    return {
      task: '',
      currGroup: {},
      currBoard: null
    }
  },
  computed: {
  },
  created() {
    this.setCurrTask()
  },
  methods: {
    async setCurrTask() {
      try {
        const boardId = this.$route.params.id
        const board = await boardService.getById(boardId)
        const taskId = this.$route.params.taskId
        const groupId = this.$route.params.groupId
        if (board) {
          this.currBoard = JSON.parse(JSON.stringify(board))
          this.currGroup = this.currBoard.groups.find(group => group.id === groupId)
          this.task = this.currGroup.tasks.find(task => task.id === taskId)
        }
      } catch (err) {
        showErrorMsg('Cannot load board')
      }
    },
    getLabelById(labelId) {
      return this.currBoard.labels.find(label => label.id === labelId)
    },
    getLabelTitle(labelId) {
      const label = this.getLabelById(labelId)
      return label.title
    },
    getLabelColor(labelId) {
      const label = this.getLabelById(labelId)
      return label.color
    },
    onSaveTask() {
      let idx = this.currGroup.tasks.findIndex(gTask => gTask.id === this.task.id)
      this.currGroup.tasks.splice(idx, 1, this.task)
      this.$emit('updateBoard', this.currBoard)
      this.$router.replace(`/board/${this.currBoard._id}`)
    }
  },
}
</script>
