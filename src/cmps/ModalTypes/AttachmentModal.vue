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
            height: 500,
            width: 500,
        }
    },
    methods: {
        async uploadFile(ev) {
            console.log(ev.target.files[0].type);
            if (ev.target.files[0].type.includes('image/')) this.type = 'image'
            if (ev.target.files[0].type.includes('text/')) this.type = 'text/plain'
            this.isUploading = true
            const { secure_url, height, width } = await uploadService.uploadImg(ev, this.type)
            this.isUploading = false
            this.fileUrl = secure_url
            this.height = height
            this.width = width
            console.log(this.fileUrl);
        }
    },
    computed: {
    },
}
</script>
  