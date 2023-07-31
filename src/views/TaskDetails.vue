<template>
  <section class="backdrop">
    <div v-if="task" ref="taskDetails" class="task-details">
      <div class="task-details-container">
        <a class="btn-icon-close" @click="closeModal"></a>
        <div class="task-details-container-two">
          <div v-if="task.cover" class="task-cover" :class="task.cover">
            <div class="task-cover-menu">
              <a class="task-cover-btn">
                <span class="btn-icon-cover"></span>
                Cover
              </a>
            </div>
          </div>
          <div class="task-header">
            <span class="btn-title-icon"></span>
            <div class="task-header-title">
              <h2 v-if="!showTaskTitle" @click="showTaskTitle = true">{{ task.title }}</h2>
              <textarea v-if="showTaskTitle" @blur="onSaveTask, showTaskTitle = false" v-model="task.title" v-focus></textarea>
            </div>
            <div class="task-header-group">
              <p>in list
                <a>{{ group.title }}</a>
              </p>
            </div>
          </div>
          <div class="task-main">
            <div class="task-details-data">
              <div v-if="task.members?.length" class="task-details-item">
                <h3>Members</h3>
                <div class="">
                  <div v-for="memberId in task.members" class="task-details-members">
                    <img class="task-member-img" :src="getMemberById(memberId).imgUrl"
                      :title="getMemberById(memberId).fullname">
                  </div>
                  <a class="task-member-add">
                    <span class="task-member-btn-add" ref="membersAdd"
                      @click="openModal('MemberModal', 'membersAdd')"></span>
                  </a>
                </div>
              </div>
              <div v-if="task.labels?.length" class="task-details-item">
                <div>
                  <div class="task-details-labels">
                    <h3>Labels</h3>
                    <div class="">
                      <div class="task-labels flex">
                        <button v-for="label in task.labels" class="task-btn-label" :ref="label"
                          :class="getLabelById(label)?.color">{{
                            getLabelById(label)?.title }}</button>
                        <button ref="labelAdd" class="task-btn-add-label"
                          @click="openModal('LabelModal', 'labelAdd')"><span></span></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="task-details-item">
                <h3>Notifications</h3>
                <a class="task-btn-watch" :style="{ width: isWatching ? '138px' : 'auto' }"
                  @click="isWatching = !isWatching">
                  <span class="task-icon-watch"></span>
                  <span class="task-txt-watch">{{ isWatching ? 'Watching' : 'Watch' }}</span>
                  <span class="is-watching" v-if="isWatching"><span class="is-watching-icon"></span></span>
                </a>
              </div>
              <div class="task-details-item">
                <h3>Due date</h3>
                <div class="task-details-due-date">
                  <a @click="dueDateChecked = !dueDateChecked" class="due-date-complete" :class="{'checked': dueDateChecked}" v-icon="'checkBox'"></a>
                  <div class="due-date-time-container">
                    <div>
                      <button class="due-date-btn">
                        <span> {{ dueDate }}</span>
                        <span class="due-date-icon"><span class="due-date-icon-span" v-icon="'arrowDown'"></span></span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <TaskDescriptionDetails :task="task" @onSaveTask="onSaveTask"></TaskDescriptionDetails>
            <TaskChecklistDetails :task="task" @onSaveTask="onSaveTask"></TaskChecklistDetails>
          </div>
          <div class="task-sidebar">
            <div class="task-sidebar-add">
              <h3 class="sidebar-add-txt">Add to card</h3>
              <a ref="members" class="task-btn-link" @click="openModal('MemberModal', 'members')">
                <span class="btn-link-members"></span>
                <span class="">Members</span>
              </a>
              <a ref="labels" class="task-btn-link" @click="openModal('LabelModal', 'labels')">
                <span class="btn-link-labels"></span>
                <span class="">Labels</span>
              </a>
              <a ref="checklists" class="task-btn-link" @click="openModal('ChecklistModal', 'checklists')">
                <span class="btn-link-checklist"></span>
                <span class="">Checklist</span>
              </a>
              <a class="task-btn-link" @click="openModal()">
                <span class="btn-link-dates"></span>
                <span class="">Dates</span>
              </a>
              <a class="task-btn-link" @click="openModal()">
                <span class="btn-link-attachment"></span>
                <span class="">Attachment</span>
              </a>
              <a v-if="!task.cover" class="task-btn-link" @click="openModal()">
                <span class="btn-link-cover"></span>
                <span class="">Cover</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from '../services/board.service.local'
import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import TaskChecklistDetails from '../cmps/TaskDetails/TaskChecklistDetails.vue'
import TaskDescriptionDetails from '../cmps/TaskDetails/TaskDescriptionDetails.vue'
export default {
  name: 'TaskDetails',
  data() {
    return {
      task: '',
      group: {},
      board: null,
      isWatching: false,
      showTaskTitle: false,
      dueDateChecked: false
    }
  },
  computed: {
    dueDate() {
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      const dateObj = new Date(this.task.dueDate * 1000)
      const month = months[dateObj.getMonth()]
      const day = dateObj.getDate()
      const hours = dateObj.getHours()
      const minutes = dateObj.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours % 12 || 12
      const displayMinutes = minutes.toString().padStart(2, '0')
      const formattedDate = `${month} ${day} at ${displayHours}:${displayMinutes} ${ampm}`
      return formattedDate
    }
  },
  created() {
    this.getTask()
    eventBus.on('setInfo', (info) => {
      if (info) {
        this.task = info.task
        this.board = info.board
        this.onSaveTask()
      } else {
        setTimeout(() => {
          document.addEventListener('click', this.handleClickOutside)
        }, 200);
      }
    })
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside)
    window.removeEventListener('resize', this.handleResize)
    eventBus.off('setInfo')
  },
  methods: {
    async getTask() {
      try {
        const boardId = this.$route.params.id
        const board = await boardService.getById(boardId)
        const taskId = this.$route.params.taskId
        const groupId = this.$route.params.groupId
        if (board) {
          this.board = JSON.parse(JSON.stringify(board))
          this.group = this.board.groups.find(group => group.id === groupId)
          this.task = this.group.tasks.find(task => task.id === taskId)
        }
      } catch (err) {
        showErrorMsg('Cannot load board')
      }
    },
    getLabelById(labelId) {
      return this.board.labels?.find(label => label.id === labelId)
    },
    getMemberById(memberId) {
      return this.board.members?.find(member => member._id === memberId)
    },
    onSaveTask() {
      let idx = this.group.tasks.findIndex(gTask => gTask.id === this.task.id)
      this.group.tasks.splice(idx, 1, this.task)
      idx = this.board.groups.findIndex(gGroup => gGroup.id === this.group.id)
      this.board.groups.splice(idx, 1, this.group)
      this.$emit('updateBoard', this.board)
    },
    closeModal() {
      this.$router.push(`/board/${this.board._id}`)
    },
    openModal(type, elRef) {
      const board = JSON.parse(JSON.stringify(this.board))
      const info = { task: this.task, board }
      const el = this.$refs[elRef].getBoundingClientRect()
      eventBus.emit('modal', { el, type, info })
      window.addEventListener('resize', this.handleResize)
      document.removeEventListener('click', this.handleClickOutside)
    },
    handleResize() {
      const el = this.$refs.labels.getBoundingClientRect()
      eventBus.emit('modal', { el })
    },
    
    handleClickOutside(event) {
      try {
        const ele = this.$refs.taskDetails.getBoundingClientRect()
        if (!(ele.left < event.x && ele.right > event.x && ele.top < event.y && ele.bottom > event.y)) this.closeModal()
      } catch { }
    },
    
  },
  components: {
    TaskChecklistDetails,
    TaskDescriptionDetails
  }
}
</script>
