<template>
    <div class="checklist-content">
        <div class="checklist" v-for="checklist in task.checklists">
            <div class="checklist-header">
                <span class="checklist-header-icon"></span>
                <div class="checklist-title">
                    <h3>{{ checklist?.title }}</h3>
                    <div class="checklist-options">
                        <a class="show-checked">Show checked items</a>
                        <a class="checklist-remove-btn">Delete</a>
                    </div>
                </div>
            </div>
            <div class="checklist-progress">
                <span class="checklist-progress-calc">40%</span>
                <div class="checklist-progress-bar">
                    <div class="checklist-current-progress"></div>
                </div>
            </div>
            <div class="checklist-list">
                <div v-for="item in checklist?.todos" class="checklist-item">
                    <div @click="setItemDone(checklist.id,item.id)" class="checklist-checkbox"><svg :class="{ 'checked': item.isDone }"
                            width="16px" height="16px" viewBox="-3 -4 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                            focusable="false" role="presentation">
                            <path
                                d="M1.49022 3.21486C1.2407 2.94412 0.818938 2.92692 0.548195 3.17644C0.277453 3.42597 0.260252 3.84773 0.509776 4.11847L2.91785 6.73131C3.2762 7.08204 3.80964 7.08204 4.14076 6.75092C4.18159 6.71082 4.18159 6.71082 4.38359 6.51218C4.57995 6.31903 4.79875 6.1037 5.03438 5.87167C5.70762 5.20868 6.38087 4.54459 7.00931 3.92318L7.0362 3.89659C8.15272 2.79246 9.00025 1.9491 9.47463 1.46815C9.73318 1.20602 9.73029 0.783922 9.46815 0.525367C9.20602 0.266812 8.78392 0.269712 8.52537 0.531843C8.05616 1.00754 7.21125 1.84829 6.09866 2.94854L6.07182 2.97508C5.4441 3.59578 4.77147 4.25926 4.09883 4.92165C3.90522 5.11231 3.72299 5.29168 3.55525 5.4567L1.49022 3.21486Z">
                            </path>
                        </svg></div>
                    <div class="checklist-item-details">
                        <div class="checklist-item-row">
                            <div class="checklist-text">
                                <span>{{ item.txt }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="checklist-add-item">
                    <button>Add an item</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    created() {
        
    },
    methods: {
        setItemDone(checklistId,itemId){
            const idx = this.task.checklists.findIndex(checklist => checklist.id === checklistId)
            const todoIdx = this.task.checklists[idx].todos.findIndex(task => task.id === itemId)
            this.task.checklists[idx].todos[todoIdx].isDone = !this.task.checklists[idx].todos[todoIdx].isDone
            this.$emit('onSaveTask')
        }
    },
    computed: {

    },
}
</script>
  