<template>
    <div class="quick-card-editor" v-if="isVisible" @click="closeEditor">
        <span class="icon-close" @click="closeEditor"> </span>
        <div :style="getPos" class="editor-wrapper" @click.stop="">
            <section class="task-preview-container">
                <!-- <div class="btn-edit" @click.stop="removeTask(task.id)"> -->
                <div v-if="task?.cover && cover" :class="task.cover.background" class="task-cover"><span
                        class="edit"></span></div>
                <div v-else-if="task?.cover" class="task-cover-img"
                    :style="{ height: calculatedHeight, backgroundImage: `url(${task.cover.background})` }">
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

                    <textarea class="task-title" v-model="task.title" dir="auto" ref="textarea"></textarea>
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
                        <div v-if="task.attachments" class="badge attachment">
                            <span class="attachment-icon"></span>
                            <span class="badge-text">{{ task.attachments.length }}</span>
                        </div>
                    </div>
                    <div class="task-members">
                        <div v-for="memberId in task.members">
                            <img :src="getMemberById(memberId).imgUrl" alt="member"
                                :title="getMemberById(memberId).fullname" />
                        </div>
                    </div>
                </div>

                <!-- <textarea>{{ task.title }}</textarea> -->
            </section>
            <button class="btn-save" @click="onSave">Save</button>
            <div class="quick-card-editor-buttons">
                <div class="quick-card-editor-btn" ref="" @click="onTaskDetails">
                    <span class="btn-card"></span>
                    <span class="btn-text">Open card</span>
                </div>
                <div class="quick-card-editor-btn" ref="editorLabels" @click="openModal('LabelModal', 'editorLabels')">
                    <span class="btn-label"></span>
                    <span class="btn-text">Edit labels</span>
                </div>
                <div class="quick-card-editor-btn" ref="editorMembers" @click="openModal('MemberModal', 'editorMembers')">
                    <span class="btn-member"></span>
                    <span class="btn-text">Change members</span>
                </div>
                <div class="quick-card-editor-btn" ref="editorCovers" @click="openModal('CoverModal', 'editorCovers')">
                    <span class="btn-cover"></span>
                    <span class="btn-text">Change cover</span>
                </div>
                <div class="quick-card-editor-btn" ref="editorMove">
                    <span class="btn-arrow"></span>
                    <span class="btn-text">Move</span>
                </div>
                <div class="quick-card-editor-btn" ref="editorCopy">
                    <span class="btn-card"></span>
                    <span class="btn-text">Copy</span>
                </div>
                <div class="quick-card-editor-btn" ref="editorDate" @click="openModal('DatePickerModal', 'editorDate')">
                    <span class="btn-clock"></span>
                    <span class="btn-text">Edit dates</span>
                </div>
                <div class="quick-card-editor-btn" @click="removeTask(task.id)">
                    <span class="btn-archive"></span>
                    <span class="btn-text">Archive</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { eventBus } from '../services/event-bus.service'
import { getActionUpdateBoard } from '../store/board.store'

export default {
    name: 'TaskEditor',
    data() {
        return {
            calculatedHeight: 0,
            dateTitle: '',
            checklistClass: '',
            task: null,
            isVisible: false,
            group: null,
            elRef: '',
            cords: {},
            isModalOpen: false,
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
            return this.task.cover.background.startsWith('https') ? false : true
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
        },
        getPos() {
            const screen = { width: window.innerWidth, height: window.innerHeight }
            const clickPos = this.cords
            const left = clickPos.left - 256 + 32 + 'px'
            var top = clickPos.top - 2
            if (screen.height - clickPos.bottom <= 200) top -= 200
            top += 'px'
            return { left, top }
        }
    },
    created() { },
    mounted() {
        this.calculateHeight()
        // You can also add a listener for window resize if needed
        window.addEventListener('resize', this.calculateHeight)
        eventBus.on('onTaskEditor', ({ task, groupId, cords }) => {
            this.cords = cords
            this.isVisible = true
            this.task = JSON.parse(JSON.stringify(task))
            this.group = JSON.parse(JSON.stringify(this.currBoard.groups.find(group => group.id === groupId)))

        })
    },
    beforeUnmount() {
        // Don't forget to remove the event listener when the component is unmounted
        window.removeEventListener('resize', this.calculateHeight)
    },
    methods: {
        async updateTask(updatedBoard) {
            const board = updatedBoard ? updatedBoard : JSON.parse(JSON.stringify(this.currBoard))
            const idx = this.group.tasks.findIndex(task => task.id === this.task.id)
            this.group.tasks.splice(idx, 1, this.task)
            const groupIdx = board.groups.findIndex(group => group.id === this.group.id)
            board.groups.splice(groupIdx, 1, this.group)
            try {
                await this.$store.dispatch(getActionUpdateBoard(board))
            }
            catch {
                console.log('Cannot update task');
            }
        },
        onSave() {
            this.updateTask()
            this.isVisible = false
        },
        async removeTask(taskId) {
            const board = JSON.parse(JSON.stringify(this.currBoard))
            const idx = this.group.tasks.findIndex(task => task.id === taskId)
            this.group.tasks.splice(idx, 1)
            const groupIdx = board.groups.findIndex(group => group.id === this.group.id)
            board.groups.splice(groupIdx, 1, this.group)
            this.closeEditor()
            try {
                await this.$store.dispatch(getActionUpdateBoard(board))
            }
            catch {
                console.log('Cannot remove task');
            }
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
        closeEditor() {
            if (!this.isModalOpen) this.isVisible = false
        },
        openModal(type, elRef) {
            this.elRef = elRef
            const board = JSON.parse(JSON.stringify(this.currBoard))
            const info = { task: this.task, board }
            const el = this.$refs[elRef].getBoundingClientRect()
            eventBus.emit('modal', { el, type, info })
            this.isModalOpen = true
            eventBus.on('setInfo', (info) => {
                if (info) {
                    this.task = info.task
                    this.updateTask(info.board)
                } else {
                    setTimeout(() => {
                        eventBus.off('setInfo')
                        this.isModalOpen = false
                    }, 200);

                }
            })
        },
        onTaskDetails() {
            const boardId = this.currBoard._id
            const groupId = this.group.id
            const taskId = this.task.id
            this.closeEditor()
            this.$router.push(`/board/${boardId}/group/${groupId}/task/${taskId}`)
        },


    },
    components: {
    },
}

</script>