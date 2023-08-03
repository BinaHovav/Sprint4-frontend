<template>
    <section class="task-preview-container" @click="onTaskDetails">
        <!-- <div class="btn-edit" @click.stop="removeTask(task.id)"> -->
        <div class="btn-edit" @click.stop="openEditor">
            <span class="edit-icon"></span>
        </div>
        <section v-if="!task?.cover.isFull">
            <div v-if="task?.cover.background && cover && !task.cover.isFull" :class="task.cover.background"
                class="task-cover">
                <span class="edit"></span>
            </div>
            <div v-else-if="task?.cover.background && !cover && !task.cover.isFull" class="task-cover-img"
                :style="{ height: calculatedHeight, backgroundImage: `url(${task.cover.background})` }">
                <span class="edit"></span>
            </div>
            <div class="task-details-container">
                <div v-if="task.labels" class="task-labels">

                    <button v-for="label in task.labels" ref="labels" @click.stop="animateLabels"
                        :class="[getLabelById(label)?.color, currBoard.labelAnimation]">
                        {{ currBoard.labelAnimation === 'labels-open' ? getLabelById(label)?.title : '' }}
                    </button>

                </div>

                <span class="task-title">{{ task.title }}</span>
                <div class="badges">
                    <!-- <div class="badge notificaition"> <span class="notificaition-icon"></span>a</div> -->
                    <!-- <div  class="badge watch" title="You are watching this card."><span class="watch-icon"></span></div> -->
                    <div v-if="task.date.dueDate" @click.stop="this.$emit('onTaskIsDone', task.id)" class="badge"
                        :class="dateClass" :title="dateTitle">
                        <span class="clock-icon"></span>
                        <span class="badge-text">{{ dueDate() }}</span>
                    </div>
                    <div v-if="task.description" class="badge description" title="This card has a description">
                        <span class="description-icon"></span>
                    </div>
                    <div v-if="task.comments?.length" class="badge comments" title="Comments">
                        <span class="comments-icon"></span>
                        <span class="badge-text">{{ task.comments.length }}</span>
                    </div>
                    <div v-if="task.checklists?.length" class="badge checklist" title="checklist items"
                        :class="checklistClass">
                        <span class="checklist-icon"></span>
                        <span class="badge-text">{{ checklistCount }}</span>
                    </div>
                    <div v-if="task.attachments.length" class="badge attachment">
                        <span class="attachment-icon"></span>
                        <span class="badge-text">{{ task.attachments.length }}</span>
                    </div>
                </div>
                <div class="task-members">
                    <div v-for="memberId in task.members">
                        <img :src="getMemberById(memberId).imgUrl" alt="member" :title="getMemberById(memberId).fullname" />
                    </div>
                </div>
            </div>
        </section>
        <div v-else class="task-cover-full" :class="task.cover.background">
            <span class="edit"></span>
            <span class="task-title">{{ task.title }}</span>
        </div>
    </section>
</template>

<script>
import { eventBus } from '../services/event-bus.service'

export default {
    name: 'TaskPreview',
    props: ['task', 'groupId'],
    data() {
        return {
            calculatedHeight: 0,
            dateTitle: '',
            checklistClass: '',
            labelState: 'labels-close'
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
            return this.task.cover.background?.startsWith('https') ? false : true
        },
        dateClass() {
            const dateObj = this.task.date.dueDate * 1000
            const now = Date.now()
            let classDisplay = ''
            if (dateObj > now) {
                classDisplay = 'due'
                this.dateTitle = 'This card is due later.'
            } else {
                classDisplay = 'is-due-past'
                this.dateTitle = 'This card is past due.'
            }
            const oneDay = 60 * 60 * 24 * 1000
            if (dateObj - now <= oneDay && dateObj - now > 0) {
                classDisplay = 'is-due-soon'
                this.dateTitle = 'This card is due in less then twenty-four hours.'
            }
            if (this.task.date.isDone) {
                classDisplay = 'is-due-complete'
                this.dateTitle = 'This card is complete.'
            }
            return classDisplay
        },
        checklistCount() {
            let sum = 0
            let doneCount = 0
            this.task.checklists.forEach(checklist => {
                sum += checklist.todos.length
                checklist.todos.forEach(todo => {
                    doneCount += todo.isDone ? 1 : 0
                })
            })
            this.checklistClass = doneCount === sum ? 'is-checklist-complete' : ''
            return `${doneCount}/${sum}`
        }
    },
    created() {
        this.labelState = this.currBoard.labelAnimation
    },
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
        async animateLabels(ev) {
            // Assuming you have a variable or some logic to determine whether the labels are open or closed
            // Replace this with your actual logic
            // Update the animation class for each task label based on the labels state
            // board.labels.forEach((label) => {
            //     label.animationClass = label.animationClass === "labels-close" ? "labels-open" : "labels-close";
            // });
            // console.log(board.labelAnimation);
            // this.labelState = "labels-close" ? "labels-open" : "labels-close"
            const board = JSON.parse(JSON.stringify(this.currBoard))
            board.labelAnimation = board.labelAnimation === "labels-close" ? "labels-open" : "labels-close"
            await this.$store.dispatch({ type: 'updateBoard', board })
           
                // this.updateMinWidth(); // Call the function to update min-width after the animation state is updated
        
        },
        updateMinWidth() {
            const buttons = this.$refs.labels; // Get the button elements using the ref
            buttons.forEach((button) => {
                if (this.labelState === "labels-open") {
                    const width = button.offsetWidth + 10; // Add some padding (adjust as needed)
                    button.style.minWidth = `${width}px`; // Set the calculated min-width in pixels
                } else {
                    button.style.minWidth = "2.5em"; // Set the default min-width when closing the labels
                }
            });
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
        openEditor(ev) {
            const cords = ev.target.parentNode.parentNode.getBoundingClientRect()
            eventBus.emit('onTaskEditor', { task: this.task, groupId: this.groupId, cords })
        }

    },
    components: {
    },
}
</script>
