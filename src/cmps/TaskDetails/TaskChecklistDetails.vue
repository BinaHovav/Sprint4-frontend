<template>
    <div class="checklist-content">
        <div class="checklist" v-for="checklist in task.checklists">
            <div class="checklist-header">
                <span class="checklist-header-icon"></span>
                <div class="checklist-title">
                    <h3>{{ checklist?.title }}</h3>
                    <div class="checklist-options">
                        <a class="show-checked">Show checked items</a>
                        <a class="checklist-remove-btn" @click="removeChecklist(checklist.id)">Delete</a>
                    </div>
                </div>
            </div>
            <div class="checklist-progress">
                <span class="checklist-progress-calc">{{ getTaskProgress(checklist?.todos) }}</span>
                <div class="checklist-progress-bar">
                    <div class="checklist-current-progress"
                        :style="{ width: getTaskProgress(checklist?.todos), backgroundColor: getTaskProgress(checklist?.todos) !== '100%' ? '#579dff' : '#1f845a' }">
                    </div>
                </div>
            </div>
            <div class="checklist-list">
                <div v-for="item in checklist?.todos" class="checklist-item">
                    <div @click="setItemDone(checklist.id, item.id)" class="checklist-checkbox" :class="{ 'checked': item.isDone }" v-icon="'checkBox'"></div>
                    <div class="checklist-item-details">
                        <div class="checklist-item-row">
                            <div class="checklist-text">
                                <span :class="{ 'checked': item.isDone }">{{ item.txt }}</span>
                                <div class="checklist-text-options">
                                    <div class="checklist-text-item-actions">
                                        <a><span @click="removeTodo(item.id,checklist.id)"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="checklist-add-item" @blue="toggleAddTodo($event, checklist.id)">
                    <button @click="toggleAddTodo($event, checklist.id)">Add an item</button>
                    <textarea @keyup.enter="addTodo(checklist?.todos, checklist.id)" :ref="checklist.id"
                        class="add-item" placeholder="Add an item" v-focus></textarea>
                    <form @keyup.enter="addTodo(checklist?.todos, checklist.id)"
                        class="add-item-options">
                        <input @click="addTodo(checklist?.todos, checklist.id)" type="submit" value="Add">
                        <a @click="toggleAddTodo($event, checklist.id)" class="add-item-cancel">Cancel</a>
                        <div class="add-item-spacer"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { utilService } from '../../services/util.service'

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
        setItemDone(checklistId, itemId) {
            const idx = this.task.checklists.findIndex(checklist => checklist.id === checklistId)
            const todoIdx = this.task.checklists[idx].todos.findIndex(task => task.id === itemId)
            this.task.checklists[idx].todos[todoIdx].isDone = !this.task.checklists[idx].todos[todoIdx].isDone
            this.$emit('onSaveTask')
        },
        getTaskProgress(todos) {
            const todoDone = todos.filter(todo => todo.isDone)
            const precent = parseInt((todoDone.length / todos.length) * 100)
            return precent ? precent+'%' : '0%'
        },
        removeChecklist(checklistId) {
            const idx = this.task.checklists.findIndex(checklist => checklist.id === checklistId)
            this.task.checklists.splice(idx, 1)
            this.$emit('onSaveTask')
        },
        toggleAddTodo(ev, checklistRef) {
            if (ev.target.nodeName === 'BUTTON') {
                this.$refs[checklistRef][0].previousSibling.style.display = "none"
                this.$refs[checklistRef][0].style.display = "block"
                this.$refs[checklistRef][0].nextSibling.style.display = "flex"
                this.$refs[checklistRef][0].focus()
            } else {
                this.$refs[checklistRef][0].previousSibling.style.display = "block"
                this.$refs[checklistRef][0].style.display = "none"
                this.$refs[checklistRef][0].value = ""
                this.$refs[checklistRef][0].nextSibling.style.display = "none"
            }
        },
        addTodo(todos, checklistRef) {
            const todo = { id: utilService.makeId(4), txt: '', isDone: false }
            todo.txt = this.$refs[checklistRef][0].value
            this.$refs[checklistRef][0].value = ''
            // this.$refs[checklistRef][0].focus()
            todos.push(todo)
            this.$emit('onSaveTask')
        },
        removeTodo(todoId, checklistId) {
            const idx = this.task.checklists.findIndex(checklist => checklist.id === checklistId)
            const todoIdx = this.task.checklists[idx].todos.findIndex(todo => todo.id === todoId)
            this.task.checklists[idx].todos.splice(todoIdx,1)
            this.$emit('onSaveTask')
        }
    },
    computed: {
    },
}
</script>
  