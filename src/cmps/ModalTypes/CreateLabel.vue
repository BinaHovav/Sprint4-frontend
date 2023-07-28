<template>
    <div class="create-labels">
        <div>
            <div :class="getLabel()?.color">{{ getLabel()?.title }}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['currLabelId', 'board'],
    name: 'CreateLabel',
    data() {
        return {
            labels: ['subtle-green', 'green', 'bold-green', 'subtle-yellow', 'yellow', 'bold-yellow', 'subtle-orange', 'orange', 'bold-orange', 'subtle-red', 'red', 'bold-red', 'subtle-purple', 'purple', 'bold-purple', 'subtle-blue', 'blue', 'bold-blue', 'subtle-sky', 'sky', 'bold-sky', 'subtle-lime', 'lime', 'bold-lime', 'subtle-pink', 'pink', 'bold-pink', 'subtle-black', 'black', 'bold-black']
        }
    },
    methods: {
        getLabel() {
            return this.board.labels.find(label => label.id === this.currLabelId)
        }
    },
    computed: {

    },
}
</script>
  