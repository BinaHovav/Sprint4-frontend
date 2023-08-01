<template >
    <div ref="appmodal" v-if="isVisible" :style="modalPlace" class="app-modal" v-clickOutside="setInfo" @click.stop="">
        <header class="modal-header">
            <button v-if="backBtn" @click.stop="changeBackBtn" class="header-back"><span
                    v-icon="'arrowLeft'"></span></button>
            <span class="header-title">{{ headerTitle }}</span>
            <a class="close-modal" @click="isVisible = false">
            </a>
        </header>
        <Component :is="type" :info="info" @closeModal="isVisible = false" @setInfo="setInfo" :backBtn="backBtn"
            @showBackBtn="changeBackBtn" />
    </div>
</template>
<script>

import { eventBus } from '../services/event-bus.service';

import LabelModal from './ModalTypes/LabelModal.vue'
import MemberModal from './ModalTypes/MemberModal.vue'
import ListActions from './ModalTypes/ListActions.vue'
import ChecklistModal from './ModalTypes/ChecklistModal.vue'
import CoverModal from './ModalTypes/CoverModal.vue'
import DatePickerModal from './ModalTypes/DatePickerModal.vue'

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
            if (type !== this.type) {
                this.isVisible = true
                this.setModalLocation(el)
                if (type) {
                    if (info) {
                        this.info = JSON.parse(JSON.stringify(info))
                    }
                    this.type = type
                }
            } else {
                this.isVisible = !this.isVisible
            }
        }
        )
    },
    methods: {
        setModalLocation(el) {
            const screen = { width: window.innerWidth, height: window.innerHeight }
            if ((el.left + 304) < screen.width) {
                this.modalPlace.left = el.left + 'px'
            } else {
                this.modalPlace.left = (screen.width - 304) + 'px'
            }
            setTimeout(() => {
                const ele = this.$refs.appmodal.getBoundingClientRect();
                if (el.top + ele.height > screen.height) {
                    this.modalPlace.top = '55px'
                } else {
                    this.modalPlace.top = el.bottom + 'px'
                }
            }, 200);
        },
        setInfo(info) {
            if (info) {
                eventBus.emit('setInfo', info)
            } else {
                eventBus.emit('setInfo')
                this.isVisible = false
            }
        },
        changeBackBtn(labelId) {
            this.edit = (labelId) ? true : false
            this.backBtn = !this.backBtn
            eventBus.emit('showBackBtn', this.backBtn)
        }
    },
    computed: {
        headerTitle() {
            switch (this.type) {
                case 'LabelModal':
                    if (!this.backBtn) return 'Labels'
                    else return (this.edit) ? 'Edit label' : 'Create label'
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
                default:
                    break
            }
        }
    },
    components: {
        LabelModal,
        MemberModal,
        ListActions,
        ChecklistModal,
        CoverModal,
        DatePickerModal,
        CreateBoardModal
    }
}
</script>
