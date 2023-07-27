<template>
    <header class="modal-header">
        <h2 class="header-title">Labels</h2>
        <button @click="this.$emit('closeModal')">
            <span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
                        fill="currentColor"></path>
                </svg>
            </span>
        </button>
    </header>
    <div class="modal-container">
        <div>
            <input class="modal-search" type="text" placeholder="Search labels...">
        </div>
        <p class="sub-header-title">Labels</p>
        <ul class="labels-options">
            <li v-for="label in boardLabels">
                <label class="label-option" @click.prevent="onSetLabel(label.id)">
                    <input class="pwLA_DnwUq5xZT" type="checkbox" aria-checked="false" aria-disabled="false"
                        aria-invalid="false" value="" :checked="isLabelChecked(label.id)">
                    <span><span><svg width="16px" height="16px" viewBox="-3 -4 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg" focusable="false" role="presentation">
                                <path
                                    d="M1.49022 3.21486C1.2407 2.94412 0.818938 2.92692 0.548195 3.17644C0.277453 3.42597 0.260252 3.84773 0.509776 4.11847L2.91785 6.73131C3.2762 7.08204 3.80964 7.08204 4.14076 6.75092C4.18159 6.71082 4.18159 6.71082 4.38359 6.51218C4.57995 6.31903 4.79875 6.1037 5.03438 5.87167C5.70762 5.20868 6.38087 4.54459 7.00931 3.92318L7.0362 3.89659C8.15272 2.79246 9.00025 1.9491 9.47463 1.46815C9.73318 1.20602 9.73029 0.783922 9.46815 0.525367C9.20602 0.266812 8.78392 0.269712 8.52537 0.531843C8.05616 1.00754 7.21125 1.84829 6.09866 2.94854L6.07182 2.97508C5.4441 3.59578 4.77147 4.25926 4.09883 4.92165C3.90522 5.11231 3.72299 5.29168 3.55525 5.4567L1.49022 3.21486Z">
                                </path>
                            </svg></span></span>
                    <span class="label-option-span">
                        <div>
                            <div class="label-styles" :class="label.color">{{ label.title }}</div>
                            <button><span><span><svg width="24" height="24" role="presentation" focusable="false"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z"
                                                fill="currentColor"></path>
                                        </svg></span></span></button>
                        </div>
                    </span>
                </label>
            </li>
        </ul>
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
    methods: {
        getLabelTitle(labelId) {
            const labels = this.boardLabels
            const label = labels.find(label => label.id === labelId)
            return label.title
        },
        getLabelColor(labelId) {
            const labels = this.boardLabels
            const label = labels.find(label => label.id === labelId)
            return label.color
        },
        isLabelChecked(labelId) {
            return this.info.includes(labelId)
        },
        onSetLabel(labelId) {
            const idx = this.info.findIndex(label => label === labelId)
            console.log('idx',idx);
            if (idx >= 0) this.info.splice(idx,1) 
            else this.info.push(labelId)
        }
    },
    computed: {
        boardLabels() {
            const board = this.$store.getters.getCurrBoard
            return board.labels
        },

    },
}
</script>
  