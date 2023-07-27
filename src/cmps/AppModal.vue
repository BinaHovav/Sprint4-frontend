<template>
    <div v-if="isVisible" :style="modalPlace" class="app-modal">
        <Component :is="type" :info="info" @setInfo="setInfo" @closeModal="isVisible = false" />
    </div>
</template>
<script>
import { eventBus } from '../services/event-bus.service';
import LabelModal from './ModalTypes/LabelModal.vue'
export default {
    data() {
        return {
            isVisible: false,
            modalPlace: {},
            info: {},
            type: ''
        }
    },
    computed: {
    },
    created() {
        eventBus.on('modal', ({ el, type, info }) => {
            this.setModalLocation(el)
            if (info && type) {
                this.info = JSON.parse(JSON.stringify(info))
                this.type = type
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
                this.modalPlace.top = el.bottom + 'px'
            } else {
                this.modalPlace.left = (screen.width - 304) + 'px'
                this.modalPlace.top = el.bottom + 'px'
            }
        },
        handleResize() {
            this.setModalLocation()
        }
    },
    components: {
        LabelModal
    }
}
</script>
  