<template>
    <section class="group-list-container flex">
        <GroupPreview v-for="group in groups" :key="group._id" :group="group" @removed="$emit('removed', group._id)" />
        
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
    methods: {},
    components: {
        GroupPreview,
    }
}
</script>
  