<template>
    <section class="task-preview-container" @click="onTaskDetails">
        <div v-if="task.cover" :class="task.cover" class="task-cover"> <span class="edit"></span></div>
        <div class="task-details-container">
            <div v-if="task.labels" class="task-labels">
                <div v-for="label in task.labels" class="task-label">
                    <button :class="getLabelColor(label)">{{ getLabelTitle(label) }}</button>
                </div>

            </div>

            <span class="task-title">{{ task.title }}</span>
            <button @click.stop="removeTask(task.id)">X</button>
            <div class="badges">
                <!-- <div class="badge notificaition"> <span class="notificaition-icon"></span>a</div> -->
                <div class="badge watch"><span class="watch-icon"></span></div>
                <div class="badge date"> <span class="date-icon"></span></div>
                <div class="badge description"> <span class="description-icon"></span></div>
                <div class="badge checklist"> <span class="checklist-icon"></span></div>
                <div class="badge comments"><span class="comments-icon"></span></div>
                <div class="badge attachment"><span class="attachment-icon"></span></div>
            </div>
        </div>

        <!-- <textarea>{{ task.title }}</textarea> -->


    </section>
</template>
  
<script>

export default {
    name: 'TaskPreview',
    props: ['task', 'groupId'],
    data() {
        return {}
    },
    computed: {
        currBoard() { return this.$store.getters.getCurrBoard },
    },
    created() { },
    methods: {
        onTaskDetails() {
            const boardId = this.$route.params.id
            this.$router.push(`/board/${boardId}/group/${this.groupId}/task/${this.task.id}`)
        },
        removeTask(taskId) {
            this.$emit('removeTask', taskId)
        },
        getLabelById(labelId) {
            return this.currBoard.labels.find(label => label.id === labelId)
        },
        getLabelTitle(labelId) {
            const label = this.getLabelById(labelId)
            return label.title
        },
        getLabelColor(labelId) {
            const label = this.getLabelById(labelId)
            return label.color
        },
    },
    components: {}
}

</script>
  