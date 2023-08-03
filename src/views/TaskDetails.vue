<template>
  <section class="backdrop">
    <div v-if="task" ref="taskDetails" class="task-details" v-clickOutside="closeModal">
      <div class="task-details-container">
        <a class="btn-icon-close" @click.stop="closeModal"></a>
        <div class="task-details-container-two">
          <div v-if="task.cover.background" class="task-cover" :class="getTaskCoverClass()" :style="getTaskCoverStyle()">
            <div class="task-cover-menu">
              <a class="task-cover-btn" ref="coversTop" @click.stop="openModal('CoverModal', 'coversTop')">
                <span class="btn-icon-cover"></span>
                Cover
              </a>
            </div>
          </div>
          <div class="task-header">
            <span class="btn-title-icon"></span>
            <div class="task-header-title">
              <h2 v-if="!showTaskTitle" @click.stop="showTaskTitle = true">{{ task.title }}</h2>
              <textarea v-if="showTaskTitle"
                @blur="onSaveTask('', { type: 'added', txt: `${task.title} to ${group.title}`, componentId: '', movedCmp: '', movedUser: '' }), (showTaskTitle = false)"
                v-model="task.title" v-focus></textarea>
            </div>
            <div class="task-header-group">
              <p>
                in list
                <a>{{ group.title }}</a>
              </p>
            </div>
            <div v-if="isWatching" class="task-header-watch">
              <span class="task-watch-icon"></span>
            </div>
          </div>
          <div class="task-main">
            <div class="task-details-data">
              <div v-if="task.members?.length" class="task-details-item">
                <h3>Members</h3>
                <div class="">
                  <div v-for="memberId in task.members" class="task-details-members">
                    <img class="task-member-img" :src="getMemberById(memberId).imgUrl"
                      :title="getMemberById(memberId).fullname" />
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
                          :class="getLabelById(label)?.color">{{ getLabelById(label)?.title }}</button>
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
              <div v-if="task.date.dueDate" class="task-details-item">
                <h3>Due date</h3>
                <div class="task-details-due-date">
                  <a @click.stop="task.date.isDone = !task.date.isDone" class="due-date-complete"
                    :class="{ 'checked': task.date.isDone }" v-icon="'checkBox'"></a>
                  <div class="due-date-time-container">
                    <div>
                      <button class="due-date-btn">
                        <span ref="datePicker" @click.stop="openModal('DatePickerModal', 'datePicker')"> {{ dueDate }}
                          <span class="soon" v-if="dueDateProgress === 'soon'">Due soon</span>
                          <span class="over" v-if="dueDateProgress === 'over'">Overdue</span>
                          <span class="complete" v-if="dueDateProgress === 'complete'">Complete</span>
                        </span>
                        <span class="due-date-icon"><span class="due-date-icon-span" v-icon="'arrowDown'"></span></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <TaskDescriptionDetails :task="task" @onSaveTask="onSaveTask" />
            <TaskAttachmentDetails v-if="task.attachments?.length" @toggleModalOpen="modalOpen = !modalOpen"
              :board="board" :task="task" @onSaveTask="onSaveTask" />
            <TaskAttachmentDetails v-if="task.attachments?.length" @toggleModalOpen="modalOpen = !modalOpen"
              :board="board" :task="task" @onSaveTask="onSaveTask" />
            <TaskChecklistDetails :task="task" @onSaveTask="onSaveTask" />
          </div>
          <div class="task-sidebar">
            <div v-if="!task.members.length" class="task-sidebar-suggested">
              <h3 class="task-side-suggested-title">Suggested</h3>
              <div class="task-join-members">
                <a @click.stop="task.members.push('u101')">
                  <span class="task-join-icon"></span>
                  <span class="task-join-text">Join</span>
                </a>
              </div>
            </div>
            <div class="task-sidebar-add">
              <h3 class="sidebar-add-txt">Add to card</h3>
              <a ref="members" class="task-btn-link" @click.stop="openModal('MemberModal', 'members')">
                <span class="btn-link-members"></span>
                <span class="">Members</span>
              </a>
              <a ref="labels" class="task-btn-link" @click.stop="openModal('LabelModal', 'labels')">
                <span class="btn-link-labels"></span>
                <span class="">Labels</span>
              </a>
              <a ref="checklists" class="task-btn-link" @click.stop="openModal('ChecklistModal', 'checklists')">
                <span class="btn-link-checklist"></span>
                <span class="">Checklist</span>
              </a>
              <a ref="datePickerSide" class="task-btn-link" @click.stop="openModal('DatePickerModal', 'datePickerSide')">
                <span class="btn-link-dates"></span>
                <span class="">Dates</span>
              </a>
              <a ref="attachmentSide" class="task-btn-link" @click.stop="openModal('AttachmentModal', 'attachmentSide')">
                <span class="btn-link-attachment"></span>
                <span class="">Attachment</span>
              </a>
              <a v-if="!task.cover.background" ref="covers" class="task-btn-link"
                @click="openModal('CoverModal', 'covers')">
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
// import { boardService } from '../services/board.service.local'
import { boardService } from '../services/board.service.js'
import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import TaskChecklistDetails from '../cmps/TaskDetails/TaskChecklistDetails.vue'
import TaskDescriptionDetails from '../cmps/TaskDetails/TaskDescriptionDetails.vue'
import TaskAttachmentDetails from '../cmps/TaskDetails/TaskAttachmentDetails.vue'

export default {
  name: 'TaskDetails',
  data() {
    return {
      task: '',
      group: {},
      board: null,
      isWatching: false,
      showTaskTitle: false,
      dueDateChecked: false,
      modalRef: 'labels',
      modalOpen: false,
      type: ''
    }
  },
  computed: {
    dueDate() {
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      const dateObj = new Date(this.task.date.dueDate * 1000)
      const month = months[dateObj.getMonth()]
      const day = dateObj.getDate()
      const hours = dateObj.getHours()
      const minutes = dateObj.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours % 12 || 12
      const displayMinutes = minutes.toString().padStart(2, '0')
      const formattedDate = `${month} ${day} at ${displayHours}:${displayMinutes} ${ampm}`
      return formattedDate
    },
    dueDateProgress() {
      const taskDate = this.task.date.dueDate * 1000
      const now = Date.now()
      const tomorrow = now + 1000 * 60 * 60 * 24
      let timeProgress = ''
      if (tomorrow > taskDate) timeProgress = 'soon'
      if (now > taskDate) timeProgress = 'over'
      if (this.task.date.isDone) timeProgress = 'complete'
      return timeProgress
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    }
  },
  created() {
    this.getTask()
  },
  unmounted() {
    this.task = ''
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
          this.group = this.board.groups.find((group) => group.id === groupId)
          this.task = this.group.tasks.find((task) => task.id === taskId)
        }
      } catch (err) {
        showErrorMsg('Cannot load board')
      }
    },
    getLabelById(labelId) {
      return this.board.labels?.find((label) => label.id === labelId)
    },
    getMemberById(memberId) {
      return this.board.members?.find((member) => member._id === memberId)
    },
    onSaveTask(task, action) {
      if (task) this.task = task
      let idx = this.group.tasks.findIndex((gTask) => gTask.id === this.task.id)
      this.group.tasks.splice(idx, 1, this.task)
      idx = this.board.groups.findIndex((gGroup) => gGroup.id === this.group.id)
      this.board.groups.splice(idx, 1, this.group)

      const activity = boardService.getEmptyActivity()
      activity.action = action
      activity.by = this.loggedinUser
      this.board.activities.unshift(activity)
      this.$emit('updateBoard', this.board)
    },
    closeModal() {
      if (!this.modalOpen) this.$router.push(`/board/${this.board._id}`)
    },
    openModal(type, elRef) {
      this.modalRef = elRef
      // const info = { task: this.task, board: this.board }
      const el = this.$refs[this.modalRef].getBoundingClientRect()
      eventBus.emit('modal', { el, type, info: { task: this.task, board: this.board } })
      this.modalOpen = true
      this.type = type
      window.addEventListener('resize', this.handleResize)
      eventBus.on('setInfo', (info, action) => {
        if (info) {
          this.task = info.task
          this.board = info.board
          this.onSaveTask('', action)
        } else {
          setTimeout(() => {
            this.modalOpen = false
            window.removeEventListener('resize', this.handleResize)
            eventBus.off('setInfo')
            this.type = ''
          }, 200)
        }
      })
    },
    handleResize() {
      const el = this.$refs[this.modalRef].getBoundingClientRect()
      eventBus.emit('modal', { el, type: this.type, info: 'resize' })
    },
    isCoverImg() {
      return this.task.cover.background?.startsWith('https')
    },
    getCoverImgStyle() {
      return { backgroundImage: `url(${task.cover.background})` }
    },
    getTaskCoverClass() {
      const task = this.task
      return (this.task.cover.background?.startsWith('https')) ? 'task-cover-img' : `task-cover-color ${task.cover.background}`
    },
    getTaskCoverStyle() {
      const task = this.task
      return (this.task.cover.background?.startsWith('https')) ? { backgroundImage: `url(${task.cover.background})` } : ''
    },
  },
  components: {
    TaskChecklistDetails,
    TaskDescriptionDetails,
    TaskAttachmentDetails
  },
}

</script>
