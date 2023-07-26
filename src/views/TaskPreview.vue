<template>
    <section class="task-preview-container">
        <div v-if="task.cover" :class="task.cover" class="task-cover"> <span class="edit"></span></div>
        <div class="task-details-container">
            <div v-if="task.labels" class="task-labels">
                <div v-for="label in task.labels" class="task-label">
                    <button style="background-color: rgb(157, 227, 157);">{{ label }}</button>
                </div>

            </div>

        </div>
        <span class="task-title">{{ task.title }}</span>
        <!-- <textarea>{{ task.title }}</textarea> -->


    </section>
</template>
  
<script>

export default {
    name: 'TaskPreview',
    props: ['task'],
    data() {
        return {}
    },
    computed: {},
    created() { },
    methods: {},
    components: {

    }
}
</script>
  