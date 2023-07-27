<template>
    <div class="task-list-container">
        <!-- <draggable v-model="tasks" group="tasks"  :move="checkMove"> -->
            <!-- <transition-group> -->
                <TaskPreview v-for="task in tasks" :key="task.id" :groupId="groupId" :task="task"
                    @removeTask="removeTask" />
            <!-- </transition-group> -->
        <!-- </draggable> -->


    </div>
</template>
  
<script>

import TaskPreview from './TaskPreview.vue'
import draggable from 'vuedraggable'

export default {
    name: 'TaskList',
    props: ['tasks', 'groupId'],
    data() {
        return {}
    },
    computed: {
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
  