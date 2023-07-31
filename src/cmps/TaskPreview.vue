<template>
    <section class="task-preview-container" @click="onTaskDetails">
        <div class="btn-edit" @click.stop="removeTask(task.id)">
            <span class="edit-icon"></span>
        </div>
        <div v-if="task?.cover && cover" :class="task.cover" class="task-cover"><span class="edit"></span></div>
        <div v-else-if="task?.cover" class="task-cover-img"
            :style="{ height: calculatedHeight, backgroundImage: `url(${task.cover})` }">
            <span class="edit"></span>
        </div>
        <div class="task-details-container">
            <div v-if="task.labels" class="task-labels">
                <div v-for="label in task.labels" class="task-label">
                    <button @click.stop="animateLabels"
                        :class="[getLabelById(label)?.color, getLabelById(label)?.animationClass]">
                        {{ getLabelById(label)?.title }}
                    </button>
                </div>
            </div>

            <span class="task-title">{{ task.title }}</span>
            <div class="badges">
                <!-- <div class="badge notificaition"> <span class="notificaition-icon"></span>a</div> -->
                <!-- <div  class="badge watch" title="You are watching this card."><span class="watch-icon"></span></div> -->
                <div @click.stop="this.$emit('onTaskIsDone',task.id)" v-if="task.date.dueDate" class="badge"
                    :class="dateClass">
                    <span class="clock-icon"></span>
                    <span class="badge-text">{{ dueDate() }}</span>
                </div>
                <div v-if="task.description" class="badge description"><span class="description-icon"></span></div>
                <div v-if="task.checklists?.length" class="badge checklist"><span class="checklist-icon"></span></div>
                <div v-if="task.comments?.length" class="badge comments"><span class="comments-icon"></span></div>
                <div v-if="task.attachment" class="badge attachment"><span class="attachment-icon"></span></div>
            </div>
            <div class="task-members" v-for="memberId in task.members">
                <div><img :src="getMemberById(memberId).imgUrl" alt="member" :title="getMemberById(memberId).fullname" />
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
            calculatedHeight: 0,
        }
    },
    computed: {
        currBoard() {
            return this.$store.getters.getCurrBoard
        },
        labelsShow() {
            return this.$store.getters.labelsShow
        },
        cover() {
            return this.task.cover.startsWith('https') ? false : true
        },
        dateClass() {
            const dateObj = this.task.date.dueDate * 1000
            const now = Date.now()
            let classDisplay = dateObj > now ? 'due' : 'is-due-past'
            const oneDay = 60 * 60 * 24 * 1000
            if (dateObj - now <= oneDay && dateObj - now > 0) classDisplay = 'is-due-soon'
            if (this.task.date.isDone) classDisplay = 'is-due-complete'
            return classDisplay

        }
    },
    created() { },
    mounted() {
        this.calculateHeight()
        // You can also add a listener for window resize if needed
        window.addEventListener('resize', this.calculateHeight)
    },
    beforeUnmount() {
        // Don't forget to remove the event listener when the component is unmounted
        window.removeEventListener('resize', this.calculateHeight)
    },
    methods: {
        onTaskDetails() {
            const boardId = this.$route.params.id
            this.$router.push(`/board/${boardId}/group/${this.groupId}/task/${this.task.id}`)
        },
        removeTask(taskId) {
            this.$emit('removeTask', taskId)
        },
        getLabelById(labelId) {
            return this.currBoard.labels?.find((label) => label.id === labelId)
        },
        getMemberById(memberId) {
            return this.currBoard.members?.find((member) => member._id === memberId)
        },
        calculateHeight() {
            const imageWidth = 16 // Adjust the aspect ratio width
            const imageHeight = 9 // Adjust the aspect ratio height
            const containerWidth = this.$el.clientWidth // Width of the task preview container

            this.calculatedHeight = (containerWidth / imageWidth) * imageHeight + 'px'
        },
        animateLabels(ev) {
            // Assuming you have a variable or some logic to determine whether the labels are open or closed
            // Replace this with your actual logic
            const board = JSON.parse(JSON.stringify(this.currBoard))
            // Update the animation class for each task label based on the labels state
            board.labels.forEach((label) => {
                label.animationClass = label.animationClass === "labels-close" ? "labels-open" : "labels-close";
            });
            this.$store.dispatch({ type: 'updateBoard', board })
        },
        dueDate() {
            const months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
            const dateObj = new Date(this.task.date.dueDate * 1000)
            const month = months[dateObj.getMonth()]
            const day = dateObj.getDate()
            const formattedDate = `${month} ${day}`
            return formattedDate
        },

    },
    components: {},
}
</script>
