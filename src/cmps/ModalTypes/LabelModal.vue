<template>
    <div v-if="!showCreate" class="label-container">
        <div>
            <input class="modal-search" type="text" placeholder="Search labels...">
        </div>
        <p class="sub-header-title">Labels</p>
        <ul class="labels-options">
            <li v-for="label in info.board.labels">
                <label class="label-option" @click.prevent="onSetLabel(label.id)">
                    <input type="checkbox" aria-checked="false" aria-disabled="false" aria-invalid="false"
                        :checked="isLabelChecked(label.id)">
                    <span class="label-check-mark" :class="{ 'checked': isLabelChecked(label.id) }"><span
                            :class="{ 'checked': isLabelChecked(label.id) }"><svg
                                :class="{ 'checked': isLabelChecked(label.id) }" width="16px" height="16px"
                                viewBox="-3 -4 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false"
                                role="presentation">
                                <path
                                    d="M1.49022 3.21486C1.2407 2.94412 0.818938 2.92692 0.548195 3.17644C0.277453 3.42597 0.260252 3.84773 0.509776 4.11847L2.91785 6.73131C3.2762 7.08204 3.80964 7.08204 4.14076 6.75092C4.18159 6.71082 4.18159 6.71082 4.38359 6.51218C4.57995 6.31903 4.79875 6.1037 5.03438 5.87167C5.70762 5.20868 6.38087 4.54459 7.00931 3.92318L7.0362 3.89659C8.15272 2.79246 9.00025 1.9491 9.47463 1.46815C9.73318 1.20602 9.73029 0.783922 9.46815 0.525367C9.20602 0.266812 8.78392 0.269712 8.52537 0.531843C8.05616 1.00754 7.21125 1.84829 6.09866 2.94854L6.07182 2.97508C5.4441 3.59578 4.77147 4.25926 4.09883 4.92165C3.90522 5.11231 3.72299 5.29168 3.55525 5.4567L1.49022 3.21486Z">
                                </path>
                            </svg></span></span>
                    <span class="label-option-span">
                        <div>
                            <div class="label-styles" :class="label.color">{{ label.title }}</div>
                            <button @click.stop="openEditLabel(label.id)"><span><span><svg width="24" height="24"
                                            role="presentation" focusable="false" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z"
                                                fill="currentColor"></path>
                                        </svg></span></span></button>
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
            }
            this.setInfo()
            this.showCreate = false
            this.$emit('showBackBtn', this.currLabelId)

        }
    },
    computed: {
        // headerTitle() {
        //     if (this.backBtn) {
        //         return this.currLabelId ? 'Edit label' : 'Create label'
        //     } else {
        //         return 'Labels'
        //     }
        // }

    },
    components: {
        CreateLabel
    }
}
</script>
  