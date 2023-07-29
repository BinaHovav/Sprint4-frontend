<template>
    <div ref="appmodal" v-if="isVisible" :style="modalPlace" class="app-modal">
        <Component :is="type" :info="info" @setInfo="setInfo" @closeModal="isVisible = false" />
    </div>
</template>
<script>
import { eventBus } from '../services/event-bus.service';
import LabelModal from './ModalTypes/LabelModal.vue'
export default {
    name: 'AppModal',
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
            if (type) {
                this.info = JSON.parse(JSON.stringify(info))
                this.type = type
                this.isVisible = !this.isVisible
            }
        }
        )
    },
    watch: {
        isVisible: {
            handler() {
                if (this.isVisible) {
                    setTimeout(() => {
                        document.addEventListener('click', this.handleClickOutside)
                    }, 200);
                } else {
                    this.setInfo()
                    document.removeEventListener('click', this.handleClickOutside)
                }
            },
            deep: true,
        },
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
        setInfo(info) {
            info ? eventBus.emit('setInfo', info) : eventBus.emit('setInfo')
            
        },
        handleClickOutside(event) {
            try {
                const ele = this.$refs.appmodal.getBoundingClientRect();
                if (!(ele.left < event.x && ele.right > event.x && ele.top < event.y && ele.bottom > event.y)) this.isVisible = false;
            } catch { }
        }
    },
    components: {
        LabelModal
    }
}
</script>
  