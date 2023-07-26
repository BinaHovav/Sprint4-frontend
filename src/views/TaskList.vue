<template>
    <div class="task-list-container">
        <pre>{{tasks}}</pre>
        <TaskPreview  />
        <!-- v-for="toy in toys" :key="toy._id" :toy="toy" @removed="$emit('removed', toy._id)" -->
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
  