<template>
    <section class="task-preview-container" @click="onTaskDetails">
        <h1>{{ task.title }}</h1>
        
        
    </section>
</template>
  
<script>

export default {
    name: 'TaskPreview',
    props: ['task', 'groupId'],
    data() {
        return {}
    },
    computed: {
        onTaskDetails(){
            const boardId = this.$route.params.boardId
            this.$route.push(`/board/${boardId}/group/${groupId}/task/${task.id}`)
        }
    },
    created() { },
    methods: {},
    components: {

    }
}
</script>
  