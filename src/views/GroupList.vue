<template>
    <button @click="addGroup">Add group</button>
    <section class="group-list-container flex">
        <GroupPreview v-for="group in groups" :key="group._id" :group="group" @removeGroup="removeGroup"
            @updateGroup="updateGroup" />

    </section>
</template>
  
<script>
import GroupPreview from './GroupPreview.vue'
export default {
    name: 'GroupList',
    props: ['groups'],
    data() {
        return {}
    },
    computed: {},
    created() {
    },
    methods: {
        removeGroup(groupId) {
            this.$emit('removeGroup', groupId)
        },
        addGroup() {
            this.$emit('addGroup')
        },
        updateGroup(group) {
            this.$emit('updateGroup', group)

        }
    },
    components: {
        GroupPreview,
    }
}
</script>
  