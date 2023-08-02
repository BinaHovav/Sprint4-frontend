<template>
    <div class="task-attachments">
        <div class="task-attachment-header">
            <span class="task-attachment-icon"></span>
            <h3 @click.stop="test">Attachments</h3>
        </div>
        <div class="task-attachment-content">
            <div class="task-attachment-container">
                <div v-for="attach in task.attachment" class="task-attachment-item">
                    <a class="attachment-thumbnail-preview" :href="attach.fileUrl" :title="attach.name">
                        <span class="attachment-thumbnail-preview-ext">txt</span>
                    </a>
                    <p class="attachment-details">
                        <span class="attach-name">{{ attach.name }}</span>
                        <a class="" ><span class="attach-icon"></span></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        task: {
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
        test() {
            console.log(this.task.attachment);

        }
    },
    computed: {
    },
}
</script>
  