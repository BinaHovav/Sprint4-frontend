<template>
    <div class="group-preview-container">
            <TaskList :tasks="group.tasks"/>
    </div>
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
  