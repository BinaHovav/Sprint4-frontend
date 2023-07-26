<template>
    <div class="task-list-container">
        <TaskPreview v-for="task in tasks" :key="task._id" :groupId="groupId" :task="task"  @removed="$emit('removed', task._id)" />

        <button @click="addTask">Add Task</button>
    </div>
</template>
  
<script>
import { boardService } from '../services/board.service.local'
import TaskPreview from './TaskPreview.vue'

export default {
    name: 'TaskList',
    props: ['tasks', 'groupId'],
    data() {
        return {}
    },
    computed: {
    },
    created() { },
    methods: {
        addTask(){
            const newTask = boardService.getEmptyTask()
            this.$emit('addTask', newTask)
        }
    },
    components: {
        TaskPreview,
    }
}
</script>
  