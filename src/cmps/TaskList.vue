<template>
        <draggable delay="250" :delay-on-touch-only="true" v-model="taskList" class="task-list-container" ghost-class="ghost-task"
            item-key="name" drag-class="drag-task" @start="drag = true" @end="drag = false" group="tasks">
            <!-- <transition-group> -->
            <template #item="{ element }">
                <TaskPreview :key="element.id" :groupId="groupId" :task="element" @removeTask="removeTask" /> 
            </template>
            <!-- </transition-group> -->
        </draggable>

</template>
  
<script>

import TaskPreview from './TaskPreview.vue'
import draggable from 'vuedraggable'

export default {
    name: 'TaskList',
    props: ['tasks', 'groupId'],
    data() {
        return {
            drag: false
        }
    },
    computed: {
        taskList: {
            get() {
                return this.tasks
            },
            set(tasks) {
                this.$emit('updateTasks', tasks, this.groupId)
            }
        }
    },
    created() { },
    methods: {
        removeTask(taskId) {
            this.$emit('removeTask', taskId)
        },
        checkMove(evt) {
            // return (evt.draggedContext.element.title !== 'apple');
        }
    },
    components: {
        TaskPreview,
        draggable
    }
}
</script>
  