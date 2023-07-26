<template>
    <section class="group-preview-container">
        <pre>{{ group }}</pre>
        <TaskList />
        <!-- v-for="toy in toys" :key="toy._id" :toy="toy" @removed="$emit('removed', toy._id)" -->
    </section>
</template>
  
<script>
import TaskList from './TaskList.vue'
export default {
    name: 'GroupPreview',
    props: ['group'],
    data() {
        return {}
    },
    computed: {},
    created() { },
    methods: {},
    components: {
        TaskList,
    }
}
</script>
  