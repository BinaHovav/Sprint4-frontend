<template>
    <div class="group-preview-container">
        <div class="group-header drag-me">
            <form action="">
                <textarea v-model="clonedGroup.title" rows="1" ref="groupNameInput" class="task-title" @blur="updateGroup"
                    @keydown.enter.prevent="updateGroup"></textarea>
            </form>
            <button class="btn-three-dots" @click="$emit('removeGroup', group.id)"><span class="three-dots"></span></button>

        </div>
        <TaskList :tasks="group.tasks" :groupId="group.id" @removeTask="removeTask" @updateTasks="updateTasks" />
        <div class="card-compose" v-if="add">
            <div class="input-title">
                <div>
                    <textarea dir="auto" placeholder="Enter a title for this card..." data-autosize="true" autofocus
                        v-model="title"></textarea>
                </div>
            </div>
            <div class="controls">
                <div @click="addTask" class="btn-add">Add card</div>
                <span @click="add = !add" class="btn-close"></span>
            </div>
        </div>
        <button v-else @click="add = !add">Add Task</button>
    </div>
</template>
  
<script>
import { boardService } from '../services/board.service.local'
import TaskList from './TaskList.vue'
export default {
    name: 'GroupPreview',
    props: ['group'],
    data() {
        return {
            clonedGroup: null,
            add: false,
            title: ''
        }
    },
    computed: {},
    created() { },
    watch: {
        group: {
            handler() {
                this.clonedGroup = JSON.parse(JSON.stringify(this.group))
            },
            immediate: true
        }
    },
    methods: {
        updateGroup() {
            this.$emit('updateGroup', this.clonedGroup)
            this.$refs.groupNameInput.blur()
        },
        addTask() {
            if(!this.title) return
            const newTask = boardService.getEmptyTask()
            newTask.title = this.title
            this.clonedGroup.tasks.push(newTask)
            this.updateGroup()
            this.title = ''
            this.add = false
        },
        removeTask(taskId) {
            console.log(taskId);
            const idx = this.clonedGroup.tasks.findIndex(task => task.id === taskId)
            this.clonedGroup.tasks.splice(idx, 1)
            this.updateGroup()
        },
        updateTasks(tasks, groupId) {
            this.$emit('updateTasks', tasks, groupId)
        },

    },
    components: {
        TaskList,
    }
}
</script>
  