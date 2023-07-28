<template>
  <section>
    <draggable
      v-model="groupList"
      group="groups"
      class="group-list-container flex"
      @start="drag = true"
      @end="drag = false"
      drag-class="drag"
      ghost-class="ghost"
      @click.right.prevent
      item-key="name"
      handle=".drag-me"
    >
      <!-- v-dragscroll.noleft="isDragScroll" ref="groupList" -->
      <template #item="{ element }">
        <GroupPreview :key="element.id" :group="element" @removeGroup="removeGroup" @updateGroup="updateGroup" />
      </template>
      <template #footer>
        <div class="add-group">
          <form @submit.prevent="addGroup">
            <input type="text" name="name" v-model="title" placeholder="Enter list title" autocomplete="off" dir="auto" maxlength="512" />
            <div class="controls">
              <!-- <div > -->
              <button class="btn-add-list">Add list</button>
              <!-- </div> -->
              <div class="btn-close-list">
                <span>X</span>
              </div>
            </div>
          </form>
        </div>
      </template>
    </draggable>
  </section>
</template>

<script>
import draggable from 'vuedraggable'
import GroupPreview from './GroupPreview.vue'
export default {
  name: 'GroupList',
  props: {
    groups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      title: null,
      drag: false,
    }
  },
  computed: {
    groupList: {
      get() {
        return this.groups
      },
      set(groups) {
        this.$emit('updateGroups', groups)
      },
    },
  },
  created() {},
  methods: {
    removeGroup(groupId) {
      this.$emit('removeGroup', groupId)
    },
    addGroup() {
      this.$emit('addGroup', this.title)
      this.title = null
    },
    updateGroup(group) {
      this.$emit('updateGroup', group)
    },
    onMove({ relatedContext, draggedContext }) {
      // const relatedElement = relatedContext.element;
      // const draggedElement = draggedContext.element;
      // return (
      //     (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      // );
      console.log('hi')
    },
  },
  components: {
    GroupPreview,
    draggable,
  },
}
</script>
