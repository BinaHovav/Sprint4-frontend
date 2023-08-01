<template>
    <div class="task-description">
        <div class="task-description-container">
            <div class="description-header">
                <span><span v-icon="'description'"></span></span>
                <h3>Description</h3>
                <div>
                    <div v-if="isEditable" class="description-info">
                        <button><span><span v-icon="'descriptionInfo'"></span></span></button>
                    </div>
                    <div class="description-edit-btn">
                        <button @click="openDescriptionEdit">Edit</button>
                    </div>
                </div>
            </div>
            <div class="description-content">
                <div class="description-txt">
                    <div v-if="isEditable" class="description-quill" >
                        <div class="quill">
                            <QuillEditor ref="quill" theme="snow" toolbar="essential" dir="auto" />
                        </div>
                        <div v-if="isEditable" class="description-save-cancel">
                            <button class="description-save" @click.stop="saveDescription">Save</button>
                            <button class="description-cancel" @click.stop="saveDescription('cancel')">Cancel</button>
                        </div>
                    </div>
                    <div v-if="!isEditable && !task.description" @click="openDescriptionEdit">Add a more detailed description...</div>
                    <div v-if="!isEditable" class="all" @click="openDescriptionEdit" dir="auto" v-html="task.description"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isEditable: false,
        }
    },
    created() {
    },
    methods: {
        openDescriptionEdit() {
            this.isEditable = true
            setTimeout(() => {
                document.querySelector('.ql-editor').focus()
                document.querySelector('.ql-editor').innerHTML = this.task.description
            }, 100)
        },
        saveDescription(cancel) {
            if (cancel !== 'cancel') {
                if (document.querySelector('.ql-editor').innerHTML !== '<p><br></p>') {
                    this.task.description = document.querySelector('.ql-editor').innerHTML
                } else {
                    this.task.description = ''
                }
                this.$emit('onSaveTask')
            }
            this.isEditable = false
        },
    },
    computed: {
    },
    components: {
        QuillEditor
    }
}
</script>
  