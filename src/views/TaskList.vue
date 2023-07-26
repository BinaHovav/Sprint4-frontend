<template>
    <div class="task-list-container">
        <TaskPreview  v-for="task in tasks" :key="task._id" :task="task" @removed="$emit('removed', task._id)"/>
        
        <button>Add Task</button>
    </div>
</template>
  
<script>
import TaskPreview from './TaskPreview.vue'
export default {
    name: 'TaskList',
    props:['tasks'],
    data() {
        return {}
    },
    computed: {},
    created() { },
    methods: {},
    components:{
        TaskPreview,
    }
}
</script>
  