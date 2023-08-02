<template>
    <div>
        <!-- Your other content here -->
        <!-- <button @click="openModal">Open Modal</button>
        <file-modal :fileContent="modalContent" @close="closeModal" /> -->
    </div>
</template>
<script>

export default {
    components: {
    },
    data() {
        return {
            modalContent: '',
        };
    },
    methods: {
          async openModal() {
            try {
              const response = await fetch('https://res.cloudinary.com/dalyqjfdr/raw/upload/v1690988317/sprint4_ko9wv2.txt'); // Replace with your text file's URL
              this.modalContent = await response.text();
              this.$modal.show('file-modal');
            } catch (error) {
              console.error('Error fetching the file:', error);
            }
          },
        closeModal() {
            this.$modal.hide('file-modal');
        },
    },
}
</script>