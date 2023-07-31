<template>
    <draggable delay="250" :delay-on-touch-only="true" v-model="taskList" class="task-list-container"
        ghost-class="ghost-task" item-key="name" drag-class="drag-task" @start="drag = true" @end="drag = false"
        group="tasks">
        <!-- <transition-group> -->
        <template #item="{ element }">
            <TaskPreview :key="element.id" :groupId="groupId" :task="element" @removeTask="removeTask" />
        </template>
        <template #footer>

            <div class="card-compose" v-if="add">
                <div class="input-title">
                    <div>
                        <textarea ref="textarea" dir="auto" placeholder="Enter a title for this card..."
                            data-autosize="true" v-model="title"></textarea>
                    </div>
                </div>
                <div class="controls">
                    <div @click="addTask" class="btn-add">Add card</div>
                    <span @click="this.$emit('changeAdd')" class="btn-close"></span>
                </div>
            </div>
        </template>
        <!-- </transition-group> -->

    </draggable>
</template>
  
<script>

import TaskPreview from './TaskPreview.vue'
import draggable from 'vuedraggable'

export default {
    name: 'TaskList',
    props: ['tasks', 'groupId', 'add'],
    data() {
        return {
            drag: false,
            title: ''
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
    created() {
    },
    watch: {
        add: {
            handler() {
                if (this.add) {
                    setTimeout(()=>{
                        this.$refs.textarea.focus()
                    },200)
                }
            }
        }
    },
    methods: {
        removeTask(taskId) {
            this.$emit('removeTask', taskId)
        },
        addTask() {
            this.$refs.textarea.focus()
            if (!this.title) return
            this.$emit('addTask', this.title)
            this.title = ''

        }
    },
    components: {
        TaskPreview,
        draggable
    }
}
</script>
  