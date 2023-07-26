<template>
    <div class="group-preview-container">
        <div class="group-header">
            <form action="">
                <textarea rows="1" class="task-title" @click="updateGroup">{{ group.title }}</textarea>
            </form>
                <button class="btn-three-dots" @click="$emit('removeGroup', group.id)"><span class="three-dots"></span></button>
            
        </div>
        <TaskList :tasks="group.tasks" :groupId="group.id" @addTask="addTask" />
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
            this.$emit('updateGroup',this.group)
        },
        addTask(newTask){
            this.group.tasks.push(newTask)
            this.updateGroup()
        }

    },
    components: {
        TaskList,
    }
}
</script>
  