<template>
    <div class="create-labels">
        <div class="create-title">
            <div class="create-title-prev" :class="editableLabel.color">{{ editableLabel.title }}</div>
        </div>
        <p>Title</p>
        <div class="title-input">
            <input ref="titleInput" type="text" v-model="editableLabel.title">
        </div>
        <p>Select a color</p>
        <div class="colors-options">
            <div class="color-option" v-for="color in labels">
                <div class="this-color" :ref="color" :class="color, { 'selected': editableLabel.color === color }"
                    :title="color" @click="setEditableLabel(color)"></div>
            </div>
        </div>
        <button class="remove-label">
            <span>
                <span>
                    <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                            fill="currentColor"></path>
                    </svg>
                </span>
            </span>
            Remove Color
        </button>
        <hr>
        <div class="create-label-btn">
            <button @click="saveLabel">{{ editableLabel?.id ? 'Save' : 'Create' }}</button>
            <button class="remove-label-btn" @click="">Delete</button>
        </div>
    </div>
</template>
<script>
import { utilService } from '../../services/util.service.js'
export default {
    props: ['currLabelId', 'board'],
    name: 'CreateLabel',
    data() {
        return {
            labels: ['subtle-green', 'subtle-yellow', 'subtle-orange', 'subtle-red', 'subtle-purple', 'green', 'yellow', 'orange', 'red', 'purple', 'bold-green', 'bold-yellow', 'bold-orange', 'bold-red', 'bold-purple', 'subtle-blue', 'subtle-sky', 'subtle-lime', 'subtle-pink', 'subtle-black', 'blue', 'sky', 'lime', 'pink', 'black', 'bold-blue', 'bold-sky', 'bold-lime', 'bold-pink', 'bold-black'],
            editableLabel: '',
        }
    },
    created() {
        this.getLabel()
        setTimeout(() => {
            this.$refs.titleInput.focus()
        }, 200);
    },
    methods: {
        getLabel() {
            if (this.currLabelId) {
                const label = this.board.labels.find(label => label.id === this.currLabelId)
                this.editableLabel = JSON.parse(JSON.stringify(label))
            } else {
                this.editableLabel = { id: '', color: '', title: '' }
                const idx = utilService.getRandomIntInclusive(0, 29)
                this.editableLabel.color = this.labels[idx]
            }
        },
        setEditableLabel(color) {
            this.editableLabel.color = color
        },
        saveLabel() {
            this.$emit('saveLabel', this.editableLabel)
        }
    },
    computed: {

    },
}
</script>
  