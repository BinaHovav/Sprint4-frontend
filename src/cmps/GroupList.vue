<template>
    <draggable v-model="groupList" group="groups" ghost-class="ghost-group" class="group-list-container flex"
        @start="onDragStart = true" @end="onDragEnd = false" @click.right.prevent item-key="name" handle=".drag-me">
        <template #item="{ element }">
            <GroupPreview :key="element.id" :group="element" @removeGroup="removeGroup" @updateGroup="updateGroup"
                @updateTasks="updateTasks" />
        </template>
        <template #footer>
            <div class="add-group">
                <form @submit.prevent="addGroup">
                    <input type="text" name="name" v-model="title" placeholder="Enter list title" autocomplete="off"
                        dir="auto" maxlength="512" required>
                    <div class="controls">
                        <button class="btn-add">Add list</button>
                        <span class="btn-close"> </span>
                    </div>
                </form>
            </div>
        </template>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import GroupPreview from './GroupPreview.vue'
import { eventBus } from '../services/event-bus.service'
export default {
    name: 'GroupList',
    props: {
        groups: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            title: null,
            drag: false,
            dragGroup: ''
        }
    },
    computed: {
        groupList: {
            get() {
                return this.groups
            },
            set(groups) {
                this.$emit('updateGroups', groups)
            }
        },
    },
    watch: {
        drag: {
            handler() {
                // console.log(this.drag);
                this.dragGroup = this.dragGroup === '' ? 'dragGroup' : ''
                // console.log(this.dragGroup);
            }
        }
    },

    created() {
        // console.log('this.dragGroup', this.dragGroup);
    },
    methods: {
        removeGroup(groupId) {
            console.log(groupId);
            this.$emit('removeGroup', groupId)
        },
        addGroup() {
            if(!this.title) return
            this.$emit('addGroup', this.title)
            eventBus.emit('boardActivity',)
            this.title = null
        },
        updateGroup(group) {
            this.$emit('updateGroup', group)
        },
        updateTasks(tasks, groupId) {
            const clonedGroup = JSON.parse(JSON.stringify(this.groups.find(group => group.id === groupId)))
            clonedGroup.tasks = tasks
            this.updateGroup(clonedGroup)
        },
        onDragStart(event) {
            // Apply the custom drag styles when dragging starts
            const draggedGroup = event.item;
            draggedGroup.classList.add('dragGroup');
        },
        onDragEnd(event) {
            // Remove the custom drag styles when dragging ends
            const draggedGroup = event.item;
            draggedGroup.classList.remove('dragGroup');
        },
    },
    components: {
        GroupPreview,
        draggable
    }
}
</script>
