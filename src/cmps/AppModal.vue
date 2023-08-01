<template>
  <div ref="appmodal" v-if="isVisible" :style="modalPlace" class="app-modal">
    <header class="modal-header">
      <button v-if="backBtn" @click.stop="changeBackBtn" class="header-back">
        <span
          ><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.292893 8.29292L7.36396 1.22185C7.75449 0.831324 8.38765 0.831324 8.77817 1.22185C9.1687 1.61237 9.1687 2.24554 8.77817 2.63606L2.41421 9.00002L8.77818 15.364C9.1687 15.7545 9.1687 16.3877 8.77818 16.7782C8.38765 17.1687 7.75449 17.1687 7.36396 16.7782L0.292893 9.70713C-0.0976312 9.3166 -0.0976312 8.68344 0.292893 8.29292Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </button>
      <h2 class="header-title">{{ headerTitle }}</h2>
      <button class="close-modal" @click="isVisible = false">
        <span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </button>
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
import CreateBoardModal from './ModalTypes/CreateBoardModal.vue'

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
      this.setModalLocation(el)
      if (type) {
        if (info) {
          this.info = JSON.parse(JSON.stringify(info))
        }
        this.type = type
        this.isVisible = !this.isVisible
      }
    })
  },
  watch: {
    isVisible: {
      handler() {
        if (this.isVisible) {
          setTimeout(() => {
            document.addEventListener('mousedown', this.handleClickOutside)
          }, 200)
        } else {
          this.setInfo()
          document.removeEventListener('mousedown', this.handleClickOutside)
        }
      },
    },
    backBtn: {
      handler() {
        document.addEventListener('mousedown', this.handleClickOutside)
      },
    },
  },
  methods: {
    setModalLocation(el) {
      const screen = { width: window.innerWidth, height: window.innerHeight }
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
      }, 100)
    },
    setInfo(info) {
      info ? eventBus.emit('setInfo', info) : eventBus.emit('setInfo')
    },
    handleClickOutside(event) {
      try {
        const ele = this.$refs.appmodal.getBoundingClientRect()
        if (!(ele.left < event.x && ele.right > event.x && ele.top < event.y && ele.bottom > event.y)) this.isVisible = false
      } catch {}
    },
    changeBackBtn(labelId) {
      this.edit = labelId ? true : false
      this.backBtn = !this.backBtn
      eventBus.emit('showBackBtn', this.backBtn)
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
        case 'CreateBoardModal':
          return 'Create board'
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
    CreateBoardModal,
  },
}
</script>
