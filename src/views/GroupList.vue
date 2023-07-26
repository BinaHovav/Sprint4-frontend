<template>
    <section class="group-list-container flex">
        <GroupPreview v-for="group in groups" :key="group._id" :group="group" @removeGroup="removeGroup"
            @updateGroup="updateGroup" />
        <div class="add-group">
            <form @submit.prevent="addGroup">
                <input type="text" name="name" v-model="title" placeholder="Enter list title" autocomplete="off" dir="auto"
                    maxlength="512">
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

    </section>
</template>
  
<script>
import GroupPreview from './GroupPreview.vue'
export default {
    name: 'GroupList',
    props: ['groups'],
    data() {
        return {
            title: null
        }
    },
    computed: {},
    created() {
    },
    methods: {
        removeGroup(groupId) {
            this.$emit('removeGroup', groupId)
        },
        addGroup() {
            this.$emit('addGroup', this.title)
            this.title = null
        },
        updateGroup(title, group) {
            this.$emit('updateGroup', title, group)

        }
    },
    components: {
        GroupPreview,
    }
}
</script>
  