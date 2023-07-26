<template>
    <div class="group-preview-container">
        <div class="group-header">
            <h1 @click="updateGroup">{{ group.title }}</h1>
            <button @click="$emit('removeGroup', group.id)">remove</button>
        </div>
        <TaskList :tasks="group.tasks" />
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
    methods: {
        updateGroup() {
            const newTitle = prompt('new title')
            this.$emit('updateGroup', newTitle, this.group)
        }
    },
    components: {
        TaskList,
    }
}
</script>
  