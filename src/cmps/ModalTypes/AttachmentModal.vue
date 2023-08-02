<template>
    <div class="attachment-container">
        <h5>
            <span>Attach a file from your computer</span>
        </h5>
        <p>You can't drag and drop files to upload them.</p>
        <label class="" for="task-attachment-file-picker">Choose a file</label>
        <input type="file" id="task-attachment-file-picker" name="card-attachment-file-picker" @change="uploadFile">
    </div>
</template>
<script>
import { uploadService } from '../../services/upload.service.js'
import { utilService } from '../../services/util.service'

export default {
    name: 'ListAction',
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    created() {
    },
    data() {
        return {
            isUploading: false,
            fileUrl: null,
        }
    },
    methods: {
        async uploadFile(ev) {
            const name = ev.target.files[0].name
            const type = this.checkFileType(ev.target.files[0].type)
            const size = ev.target.files[0].size
            const { secure_url } = await uploadService.uploadFile(ev)
            const fileUrl = secure_url
            const attachment = { id: utilService.makeId(5), type, name, size, fileUrl, createdAt: Date.now() }
            this.info.task.attachment.unshift(attachment)
            this.$emit('setInfo', this.info)
        },
        checkFileType(fileType) {
            if (fileType === 'text/plain') return 'txt'
            else if (fileType.startsWith('image/')) return 'image'
            else return 'raw'
        }
    },
    computed: {
    },
}
</script>
  