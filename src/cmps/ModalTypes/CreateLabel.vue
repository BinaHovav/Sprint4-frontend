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
                    :title="color" @click.stop="setEditableLabel(color)"></div>
            </div>
        </div>
        <button class="remove-label" @click="editableLabel.color = ''" :disabled="!editableLabel.color">
            <span><span v-icon="'X'"></span></span>
            Remove Color
        </button>
        <hr>
        <div class="create-label-btn">
            <button @click="saveLabel">{{ editableLabel?.id ? 'Save' : 'Create' }}</button>
            <button v-if="editableLabel.id" @click.stop="removeLabel" class="remove-label-btn">Delete</button>
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
        },
        removeLabel() {
            this.$emit('removeLabel', this.editableLabel)
        }
    },
    computed: {
        
    },
}
</script>
  