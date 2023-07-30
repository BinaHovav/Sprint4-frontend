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
                    <div @click="setItemDone(checklist.id, item.id)" class="checklist-checkbox"><svg
                            :class="{ 'checked': item.isDone }" width="16px" height="16px" viewBox="-3 -4 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg" focusable="false" role="presentation">
                            <path
                                d="M1.49022 3.21486C1.2407 2.94412 0.818938 2.92692 0.548195 3.17644C0.277453 3.42597 0.260252 3.84773 0.509776 4.11847L2.91785 6.73131C3.2762 7.08204 3.80964 7.08204 4.14076 6.75092C4.18159 6.71082 4.18159 6.71082 4.38359 6.51218C4.57995 6.31903 4.79875 6.1037 5.03438 5.87167C5.70762 5.20868 6.38087 4.54459 7.00931 3.92318L7.0362 3.89659C8.15272 2.79246 9.00025 1.9491 9.47463 1.46815C9.73318 1.20602 9.73029 0.783922 9.46815 0.525367C9.20602 0.266812 8.78392 0.269712 8.52537 0.531843C8.05616 1.00754 7.21125 1.84829 6.09866 2.94854L6.07182 2.97508C5.4441 3.59578 4.77147 4.25926 4.09883 4.92165C3.90522 5.11231 3.72299 5.29168 3.55525 5.4567L1.49022 3.21486Z">
                            </path>
                        </svg></div>
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
                <div class="checklist-add-item">
                    <button @click="toggleAddTodo($event, checklist.id)">Add an item</button>
                    <textarea @keyup.enter="addTodo(checklist?.todos, checklist.id)" :ref="checklist.id"
                        class="add-item" placeholder="Add an item"></textarea>
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
            this.$refs[checklistRef][0].focus()
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
  