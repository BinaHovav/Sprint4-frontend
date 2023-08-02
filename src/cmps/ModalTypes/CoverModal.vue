<template>
    <div class="cover-container">
        <div class="cover-size">
            <h4 class="first-h4">Size</h4>
            <div class="cover-layout-options">
                <div class="cover-layout-top" @click.stop="this.info.task.cover.isFull = false" :class="{'checked' : !this.info.task.cover.isFull}">
                    <div class="cover-top green"></div>
                    <div class="cover-top-text">
                        <div class="cover-top-text-1"></div>
                        <div class="cover-top-text-2"></div>
                        <div class="cover-top-text-3">
                            <div class="cover-top-text-3-1"></div>
                            <div class="cover-top-text-3-2"></div>
                        </div>
                        <div class="cover-top-text-4"></div>
                    </div>
                </div>
                <div class="cover-layout-full" @click.stop="this.info.task.cover.isFull = true" :class="{'checked' : this.info.task.cover.isFull}">
                    <div class="cover-full-text">
                        <div class="cover-full-text-1"></div>
                        <div class="cover-full-text-2"></div>
                    </div>
                </div>
            </div>
            <button class="remove-cover" @click.stop="this.info.task.cover.background=''">Remove cover</button>
            <h4>Colors</h4>
            <div class="covers-list">
                <button v-for="cover in covers" @click.stop="updateCover(cover)" :class="[cover ,{ 'picked' : coverSelected(cover) }]"></button>
            </div>
            <h4>Attachments</h4>
            <div class="upload-cover">
                <input type="file" accept="image/*" hidden>
                <button>Upload a cover image</button>
            </div>
            <h4>Photos from Unsplash</h4>
            <div class="covers-img-list">
                <div>
                    <button v-for="test in coverImg" :style="{ 'background-image': 'url(' + test + ')' }"></button>
                </div>
            </div>
        </div>
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
            covers: ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'sky', 'lime', 'pink', 'black'],
            coverImg: ['https://images.unsplash.com/photo-1689631857988-a46ee3adf86b?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDZ8MzE3MDk5fHx8fHwyfHwxNjkwODExODY0fA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=200',
                'https://images.unsplash.com/photo-1690055899078-63be27a01cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDV8MzE3MDk5fHx8fHwyfHwxNjkwODExODY0fA&ixlib=rb-4.0.3&q=80&w=200',
                'https://images.unsplash.com/photo-1690068867587-d7572f95ff33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjkwODExODY0fA&ixlib=rb-4.0.3&q=80&w=200',
                'https://images.unsplash.com/photo-1690046793092-f8d634523264?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjkwODExODY0fA&ixlib=rb-4.0.3&q=80&w=200',
                'https://images.unsplash.com/photo-1690184432588-81068877d852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjkwODExODY0fA&ixlib=rb-4.0.3&q=80&w=200',
                'https://images.unsplash.com/photo-1613667023102-44f9adaf9346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjkwODExODY0fA&ixlib=rb-4.0.3&q=80&w=200']


        }
    },
    methods: {
        coverSelected(cover) {
            return this.info.task.cover.background === cover
        },
        updateCover(cover) {
            this.info.task.cover.background = cover
            this.$emit('setInfo', this.info)
        }
    },
    computed: {
    }
}
</script>
  