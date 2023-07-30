<template>
  <div class="backdrop">
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
                  <a class="due-date-complete"><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'
                      fill='transparent' viewBox='-3 -4 16 16'>
                      <path
                        d='M1.49 3.215a.667.667 0 0 0-.98.903l2.408 2.613c.358.351.892.351 1.223.02l.243-.239a1689.645 1689.645 0 0 0 2.625-2.589l.027-.026a328.23 328.23 0 0 0 2.439-2.429.667.667 0 1 0-.95-.936c-.469.476-1.314 1.316-2.426 2.417l-.027.026a1368.126 1368.126 0 0 1-2.517 2.482L1.49 3.215Z' />
                    </svg></a>
                  <div class="due-date-time-container">
                    <div>
                      <button class="due-date-btn">
                        <span> {{ dueDate }}</span>
                        <span class="due-date-icon"><span class="due-date-icon-span"><svg width="16" height="16"
                              role="presentation" focusable="false" viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                                fill="currentColor"></path>
                            </svg></span></span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="task-description">
              <div class="task-description-container">
                <div class="description-header">
                  <span><span><svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H20C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9H4ZM3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14ZM4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H4Z"
                          fill="currentColor"></path>
                      </svg></span></span>
                  <h3>Description</h3>
                  <div>
                    <div v-if="isEditable" class="description-info">
                      <button><span><span><svg width="24" height="24" role="presentation" focusable="false"
                              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                fill="currentColor"></path>
                              <path
                                d="M11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11Z"
                                fill="currentColor"></path>
                              <path
                                d="M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z"
                                fill="currentColor"></path>
                            </svg></span></span></button>
                    </div>
                    <div class="description-edit-btn">
                      <button @click="openDescriptionEdit">Edit</button>
                    </div>
                  </div>
                </div>
                <div class="description-content">
                  <div class="description-txt">
                    <p v-if="!isEditable" @click="openDescriptionEdit">{{ task.description }}</p>
                    <div v-if="isEditable" contenteditable="true" ref="editableDescription">{{ task.description }}</div>
                    <div v-if="isEditable" class="description-save-cancel">
                      <button class="description-save" @click="saveDescription">Save</button>
                      <button class="description-cancel" @click="saveDescription('cancel')">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  </div>
</template>

<script>
import { boardService } from '../services/board.service.local'
import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import TaskChecklistDetails from '../cmps/TaskDetails/TaskChecklistDetails.vue'
export default {
  name: 'TaskDetails',
  data() {
    return {
      task: '',
      group: {},
      board: null,
      isWatching: false,
      isEditable: false,
      showTaskTitle: false,
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
    saveDescription(cancel) {
      if (cancel !== 'cancel') {
        this.task.description = this.$refs.editableDescription.innerText
        this.onSaveTask
      }
      this.$refs.editableDescription.blur()
      this.isEditable = false
    },
    handleClickOutside(event) {
      try {
        const ele = this.$refs.taskDetails.getBoundingClientRect()
        if (!(ele.left < event.x && ele.right > event.x && ele.top < event.y && ele.bottom > event.y)) this.closeModal()
      } catch { }
    },
    openDescriptionEdit() {
      this.isEditable = true
      setTimeout(() => {
        this.$refs.editableDescription.focus()
      }, 200);
    }
  },
  components: {
    TaskChecklistDetails
  }
}
</script>
