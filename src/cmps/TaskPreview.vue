<template>
    <section class="task-preview-container" @click="onTaskDetails">
        <div class="btn-edit" @click.stop="removeTask(task.id)">
            <span class="edit-icon"></span>
        </div>
        <div v-if="task.cover" :class="task.cover" class="task-cover"> <span class="edit"></span></div>
        <div class="task-details-container">
            <div v-if="task.labels" class="task-labels">
                <div v-for="label in    task.labels   " class="task-label">
                    <button @click.stop="this.$store.commit({ type: 'setLabelsShow' })"
                        :class="[getLabelById(label).color, labelsShow ? 'labels-open' : 'labels-close']">{{
                            getLabelById(label).title }}</button>
                </div>

            </div>

            <span class="task-title">{{ task.title }}</span>
            <div class="badges">
                <!-- <div class="badge notificaition"> <span class="notificaition-icon"></span>a</div> -->
                <div class="badge watch"><span class="watch-icon"></span></div>
                <div v-if="task.dueDate" class="badge date"> <span class="date-icon"></span></div>
                <div v-if="task.description" class="badge description"> <span class="description-icon"></span></div>
                <div v-if="task.checklist" class="badge checklist"> <span class="checklist-icon"></span></div>
                <div v-if="task.comments" class="badge comments"><span class="comments-icon"></span></div>
                <div v-if="task.attachment" class="badge attachment"><span class="attachment-icon"></span></div>
            </div>
            <div class="task-members" v-for="   memberId    in    task.members   ">
                <div><img :src="getMemberById(memberId).imgUrl" alt="member" :title="getMemberById(memberId).fullname">
                </div>
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
        return {
        }
    },
    computed: {
        currBoard() { return this.$store.getters.getCurrBoard },
        labelsShow() { return this.$store.getters.labelsShow }
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
        getMemberById(memberId) {
            return this.currBoard.members.find(member => member._id === memberId)
        },
    },
    components: {}
}

</script>
  