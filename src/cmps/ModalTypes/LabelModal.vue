<template>
    <div v-if="!showCreate" class="label-container">
        <div>
            <input class="modal-search" type="text" placeholder="Search labels..." v-focus>
        </div>
        <p class="sub-header-title">Labels</p>
        <ul class="labels-options">
            <li v-for="label in info.board.labels">
                <label class="label-option" @click.prevent="onSetLabel(label.id)">
                    <input type="checkbox" aria-checked="false" aria-disabled="false" aria-invalid="false"
                        :checked="isLabelChecked(label.id)">
                    <span class="label-check-mark" :class="{ 'checked': isLabelChecked(label.id) }"><span
                            :class="{ 'checked': isLabelChecked(label.id) }" v-icon="'checkBox'"></span></span>
                    <span class="label-option-span">
                        <div>
                            <div class="label-styles" :class="label.color">{{ label.title }}</div>
                            <button @click.stop="openEditLabel(label.id)"><span><span v-icon="'pencilEdit'"></span></span></button>
                        </div>
                    </span>
                </label>
            </li>
        </ul>
        <button class="create-label" @click.stop="openEditLabel">Create a new label</button>
    </div>
    <CreateLabel v-if="showCreate" :currLabelId="currLabelId" :board="info.board" @saveLabel="saveLabel" @removeLabel="removeLabel" />
</template>
<script>
import { eventBus } from '../../services/event-bus.service'
import { utilService } from '../../services/util.service'
import CreateLabel from './CreateLabel.vue'
export default {
    emits: ['setInfo', 'closeModal', 'showBackBtn'],
    props: {
        info: {
            type: Object,
            required: true
        },
        backBtn: {
            typeof: Boolean,
            required: true
        }
    },
    name: 'LabelModal',
    data() {
        return {
            currLabelId: '',
            showCreate: false
        }
    },
    created() {
        eventBus.on('showBackBtn', (backBtn) => {
            this.showCreate = backBtn
            if (!backBtn) this.currLabelId = ''
        })
    },
    methods: {
        isLabelChecked(labelId) {
            return this.info.task.labels?.includes(labelId)
        },
        onSetLabel(labelId) {
            const idx = this.info.task.labels?.findIndex(label => label === labelId)
            if (idx >= 0) this.info.task.labels?.splice(idx, 1)
            else this.info.task.labels.push(labelId)
            this.setInfo()
        },
        setInfo() {
            this.$emit('setInfo', this.info)
        },
        openEditLabel(labelId) {
            if (!labelId) this.currLabelId = ''
            else if (typeof (labelId) == 'string') this.currLabelId = labelId
            this.$emit('showBackBtn', this.currLabelId)
        },
        saveLabel(newLabel) {
            if (newLabel.id) {
                const idx = this.info.board.labels.findIndex(label => newLabel.id === label.id)
                this.info.board.labels.splice(idx, 1, newLabel)
            } else {
                newLabel.id = utilService.makeId(4)
                this.info.task.labels.push(newLabel.id)
                this.info.board.labels.push(newLabel)
            }
            this.setInfo()
            this.showCreate = false
            this.$emit('showBackBtn', this.currLabelId)
        },
        removeLabel(labelToRemove){
            if (labelToRemove.id) {
                const idx = this.info.board.labels.findIndex(label => labelToRemove.id === label.id)
                this.info.board.labels.splice(idx, 1)
                const taskIdx = this.info.task.labels.findIndex(label => label.id === labelToRemove.id)
                this.info.task.labels.splice(taskIdx,1)
            }
            this.setInfo()
            this.showCreate = false
            this.$emit('showBackBtn', this.currLabelId)

        }
    },
    computed: {

    },
    components: {
        CreateLabel
    }
}
</script>
  