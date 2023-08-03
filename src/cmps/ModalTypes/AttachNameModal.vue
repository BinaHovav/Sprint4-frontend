<template>
    <div class="attach-name-update">
        <form @submit.prevent="saveUpdate">
            <label>
                Link name
                <input class="name-input" type="text" v-model="attach.name" v-focus>
            </label>
            <input class="save-name" type="submit" value="Update">
        </form>
    </div>
</template>
<script>

export default {
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            attach: {}
        };
    },
    mounted(){
        setTimeout(() => {
            this.getAttach()
        }, 500);
    },
    methods: { 
        getAttach(){
            const idx = this.info.task.attachments.findIndex(attachment => attachment.id === this.info.attachId)
            this.attach = this.info.task.attachments[idx]
        },
        saveUpdate(){
            const idx = this.info.task.attachments.findIndex(attachment => attachment.id === this.info.attachId)
            this.info.task.attachments.splice(idx,1,this.attach)
            this.$emit('setInfo', this.info)
            this.$emit('setInfo')
        }
    },
    components: {
    },
}
</script>