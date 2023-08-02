<template>
    <div class="task-attachments">
        <div class="task-attachment-header">
            <span class="task-attachment-icon"></span>
            <h3 @click.stop="test">Attachments</h3>
        </div>
        <div class="task-attachment-content">
            <div class="task-attachment-container">
                <div v-for="attach in task.attachment" class="task-attachment-item">
                    <a v-if="attach.type !== 'image'" class="attachment-thumbnail-preview" :title="attach.name">
                        <span class="attachment-thumbnail-preview-text">{{ attach.type
                        }}</span>
                    </a>
                    <a v-if="attach.type === 'image'" class="attachment-thumbnail-preview" :title="attach.name">
                        <span class="attach-prev-img" :style="{ backgroundImage: `url(${attach.fileUrl})` }"></span>
                    </a>
                    <p class="attachment-details flex column">
                        <span class="attach-name">{{ attach.name }}
                            <a class="attachment-icon" :href="attach.fileUrl" target="_blank"><span
                                    class="attach-icon"></span></a></span>
                        <span class="attachment-options">
                            <span class="attach-add-time">Added<span>{{ getAttachTime(attach.createdAt) }}</span></span>
                            <span class="attach-comment"><a class="attach-option-a"><span>Comment</span></a></span>
                            <span class="attach-remove" @click.stop="removeAttach(attach.id)"><a
                                    class="attach-option-a"><span>Delete</span></a></span>
                            <span ref="attachEdit" class="attach-edit"
                                @click.stop="openModal('AttachNameModal', attach.id)"><a
                                    class="attach-option-a"><span>Edit</span></a></span>
                        </span>
                        <span v-if="attach.type === 'image'" @click.stop="toggleImgCover(attach.fileUrl)" class="toggle-img-cover">
                            <span class="toggle-cover-container">
                                <span class="attach-cover-img-icon"></span>
                                <span class="attach-cover-txt">{{ imgIsCover(attach.fileUrl) ? 'Remove cover' : 'Make cover'
                                }}</span>
                            </span>
                        </span>
                    </p>
                </div>
                <div class="task-add-attachment">
                    <button>Add an attachment</button>
                    <!-- <AttachmentModalPreview></AttachmentModalPreview> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AttachmentModalPreview from '../AttachmentModalPreview.vue'
import { eventBus } from '../../services/event-bus.service'

export default {
    props: {
        task: {
            type: Object,
            required: true
        },
        board: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        getAttachTime(attachTime) {
            return ' 5 hours ago'
        },
        removeAttach(attachId) {
            const idx = this.task.attachment.findIndex(attach => attach.id === attachId)
            this.task.attachment.splice(idx, 1)
            this.$emit('onSaveTask')
        },
        openModal(type, attachId) {
            const info = { task: this.task, attachId }
            const el = this.$refs.attachEdit[0].getBoundingClientRect()
            eventBus.emit('modal', { el, type, info })
            this.$emit('toggleModalOpen')
            window.addEventListener('resize', this.handleResize)
            eventBus.on('setInfo', (info) => {
                if (info) {
                    this.$emit('onSaveTask', info.task)
                }
                setTimeout(() => {
                    window.removeEventListener('resize', this.handleResize)
                    eventBus.off('setInfo')
                }, 200)
            })
        },
        handleResize() {
            const el = this.$refs.attachEdit[0].getBoundingClientRect()
            eventBus.emit('modal', { el })
        },
        imgIsCover(attachImg) {
            return attachImg === this.task.cover.background
        },
        toggleImgCover(attachImg){
            this.task.cover.background = (attachImg === this.task.cover.background) ? '' : attachImg
            this.$emit('onSaveTask')
        }
    },
    computed: {
    },
    components: {
        AttachmentModalPreview
    }
}
</script>
  