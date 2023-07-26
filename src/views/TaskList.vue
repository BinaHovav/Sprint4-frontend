<template>
    <div class="task-list-container">
        <TaskPreview v-for="task in tasks" :key="task._id" :groupId="groupId" :task="task"  @removed="$emit('removed', task._id)" />

        <button @click="addTask">Add Task</button>
    </div>
</template>
  
<script>
import TaskPreview from './TaskPreview.vue'
export default {
    name: 'TaskList',
    props: ['tasks', 'groupId'],
    data() {
        return {}
    },
    computed: {
        addTask() {
            // const taskTitle = prompt('title?')
            // const newTask = boardService.()
            // newGroup.title = groupTitle
            // this.board.groups.unshift(newGroup)
            // try {
            //     await this.$store.dispatch(getActionUpdateBoard(this.board))
            //     showSuccessMsg('Group added')
            // } catch (err) {
            //     showErrorMsg('Cannot add group')

            // }
        }
    },
    created() { },
    methods: {},
    components: {
        TaskPreview,
    }
}
</script>
  