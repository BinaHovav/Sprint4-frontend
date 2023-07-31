<template>
    <draggable v-model="groupList" group="groups" ghost-class="ghost-group" class="group-list-container flex u-fancy-scrollbar"
        @start="drag = true" @end="drag = false" @change="handleDragChange" @click.right.prevent item-key="name"
        handle=".drag-me" drag-class="drag-group">
        <template #item="{ element }">
            <GroupPreview :key="element.id" :group="element" @removeGroup="removeGroup" @updateGroup="updateGroup"
                @updateTasks="updateTasks"  />
        </template>
        <template #footer>
            <div @click="addList = !addList" v-if="!addList" class="add-group-before">
                <div>
                    <span class="plus-icon"> </span>
                </div>
                <div>Add another list </div>


            </div>
            <div v-else class="add-group">
                <form @submit.prevent="addGroup">
                    <input type="text" name="name" v-model="title" placeholder="Enter list title" autocomplete="off"
                        dir="auto" maxlength="512" required ref="addGroupRef" v-focus>
                    <div class="controls">
                        <button class="btn-add">Add list</button>
                        <span @click="addList = !addList" class="btn-close"> </span>
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
            dragGroup: '',
            addList: false,
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
    // watch: {
    //     drag: {
    //         handler() {
    //             // console.log(this.drag);
    //             this.dragGroup = this.dragGroup === '' ? 'dragGroup' : ''
    //             // console.log(this.dragGroup);
    //         }
    //     }
    // },

    created() {
        // console.log('this.dragGroup', this.dragGroup);
    },
    methods: {
        removeGroup(groupId) {
            this.$emit('removeGroup', groupId)
        },
        addGroup() {
            if (!this.title) return
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
        // onDragStart(event) {
        //     // Apply the custom drag styles when dragging starts
        //     const draggedGroup = event.item;
        //     draggedGroup.classList.add('dragGroup');
        // },
        // onDragEnd(event) {
        //     // Remove the custom drag styles when dragging ends
        //     const draggedGroup = event.item;
        //     draggedGroup.classList.remove('dragGroup');
        // },
        handleDragStart(evt) {
            // Get the dragged element
            const draggedElement = evt.item;

            // Add custom styles for opacity and rotation while dragging starts
            draggedElement.style.opacity = '0.8'; // Adjust the opacity value as needed
            draggedElement.style.transform = 'rotate(5deg)'; // Adjust the rotation angle as needed
        },
        handleDragEnd(evt) {
            // Get the dragged element
            const draggedElement = evt.item;

            // Remove custom styles when dragging ends
            draggedElement.style.opacity = '';
            draggedElement.style.transform = '';
        },
        handleDragChange(evt) {
            // Get the dragged element
            const draggedElement = evt.item;

            // Check if the element is currently being dragged
            if (evt.dragging) {
                draggedElement.style.opacity = '0.8'; // Adjust the opacity value as needed
                draggedElement.style.transform = 'rotate(5deg)'; // Adjust the rotation angle as needed
            } else {
                draggedElement.style.opacity = '';
                draggedElement.style.transform = '';
            }
        },
    },
    components: {
        GroupPreview,
        draggable
    }
}
</script>
