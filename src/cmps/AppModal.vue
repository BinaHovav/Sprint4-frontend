<template>
  <div ref="appmodal" v-if="isVisible" :style="modalPlace" class="app-modal" v-clickOutside="setInfo" @click.stop="">
    <header class="modal-header">
      <button v-if="backBtn" @click.stop="changeBackBtn" class="header-back"><span v-icon="'arrowLeft'"></span></button>
      <span class="header-title">{{ headerTitle }}</span>
      <a class="close-modal" @click.stop="closeModal"> </a>
    </header>
    <Component :is="type" :info="info" @closeModal="isVisible = false" @setInfo="setInfo" :backBtn="backBtn" @showBackBtn="changeBackBtn" />
  </div>
</template>
<script>
import { eventBus } from '../services/event-bus.service'

import LabelModal from './ModalTypes/LabelModal.vue'
import MemberModal from './ModalTypes/MemberModal.vue'
import ListActions from './ModalTypes/ListActions.vue'
import ChecklistModal from './ModalTypes/ChecklistModal.vue'
import CoverModal from './ModalTypes/CoverModal.vue'
import DatePickerModal from './ModalTypes/DatePickerModal.vue'
import CreateBoardModal from './ModalTypes/CreateBoardModal.vue'
import AttachmentModal from './ModalTypes/AttachmentModal.vue'
import AttachNameModal from './ModalTypes/AttachNameModal.vue'

export default {
  name: 'AppModal',
  data() {
    return {
      isVisible: false,
      modalPlace: {},
      info: {},
      type: '',
      backBtn: false,
      edit: false,
    }
  },

  created() {
    eventBus.on('modal', ({ el, type, info }) => {
      if (info) {
        this.info = JSON.parse(JSON.stringify(info))
      }
      if (type !== this.type) {
        this.isVisible = true
        if (type) {
          this.type = type
        }
        this.setModalLocation(el)
      } else {
        this.isVisible = !this.isVisible
      }
    })
  },
  methods: {
    setModalLocation(el) {
      const screen = { width: window.innerWidth, height: window.innerHeight }
      if (this.type !== 'CreateBoardModal') {
        if (el.left + 304 < screen.width) {
          this.modalPlace.left = el.left + 'px'
        } else {
          this.modalPlace.left = screen.width - 304 + 'px'
        }
        setTimeout(() => {
          const ele = this.$refs.appmodal.getBoundingClientRect()
          if (el.top + ele.height > screen.height) {
            this.modalPlace.top = '55px'
          } else {
            this.modalPlace.top = el.bottom + 'px'
          }
        }, 200)
      } else {
        if (this.type === 'CreateBoardModal') {
          this.modalPlace.bottom = el.bottom - 200 + 'px'
          this.modalPlace.left = el.right + 'px'
        }
      }
    },
    setInfo(info) {
      if (info) {
        eventBus.emit('setInfo', info)
      } else {
        this.info = {}
        eventBus.emit('setInfo')
        this.isVisible = false
        this.backBtn = false
      }
    },
    changeBackBtn(labelId) {
      this.edit = labelId ? true : false
      this.backBtn = !this.backBtn
      eventBus.emit('showBackBtn', this.backBtn)
    },
    closeModal() {
      eventBus.emit('setInfo')
      this.isVisible = false
    },
  },
  computed: {
    headerTitle() {
      switch (this.type) {
        case 'LabelModal':
          if (!this.backBtn) return 'Labels'
          else return this.edit ? 'Edit label' : 'Create label'
        case 'MemberModal':
          return 'Members'
        case 'ListActions':
          return 'List actions'
        case 'ChecklistModal':
          return 'Add checklist'
        case 'CoverModal':
          return 'Cover'
        case 'DatePickerModal':
          return 'Dates'
        case 'CreateBoardModal':
          return 'Create board'
        case 'AttachmentModal':
          return 'Attach'
        case 'AttachNameModal':
          return 'Edit attachment'
        default:
          break
      }
    },
  },
  components: {
    LabelModal,
    MemberModal,
    ListActions,
    ChecklistModal,
    CoverModal,
    DatePickerModal,
    CreateBoardModal,
    AttachmentModal,
    AttachNameModal
  },
}
</script>
