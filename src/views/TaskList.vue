<template>
    <section class="task-list-container">
        <h1>task list</h1>
        <TaskPreview  />
        <!-- v-for="toy in toys" :key="toy._id" :toy="toy" @removed="$emit('removed', toy._id)" -->
    </section>
</template>
  
<script>
import TaskPreview from './TaskPreview.vue'
export default {
    name: 'TaskList',
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
  