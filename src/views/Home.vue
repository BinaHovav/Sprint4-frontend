<template>
  <main class="homepage-main-container u-fancy-scrollbar">
    <div class="top-section">
      <div class="left-box">
        <h1>Mellow brings all your tasks, teammates, and tools together</h1>
        <p>Keep everything in the same place - even if your team isn’t.</p>
        <RouterLink to="/board" class="btn-try"
          >Start Mellow
          <div class="arrow-icons">
            <span v-icon="'arrowRight'"></span>
            <span v-icon="'arrowRight'"></span>
          </div>
        </RouterLink>
      </div>

      <div class="right-box">
        <img src="https://merllo-0m15.onrender.com/assets/TrelloUICollage_4x.193e8069.webp" />
      </div>
    </div>
    <div class="middle-section">
      <div class="top-box">
        <p class="top-box-title">MELLOW 101</p>
        <h2 class="top-box-sub-title">A productivity powerhouse</h2>
        <p class="top-box-content">Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done.</p>
      </div>
      <div class="left-box">
        <button @click="changeImage('boards')" :class="option === 'boards' ? 'selected' : ''">
          <h3>Boards</h3>
          <p>Mellow boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!</p>
        </button>
        <button @click="changeImage('lists')" :class="option === 'lists' ? 'selected' : ''">
          <h3>Lists</h3>
          <p>The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Mello.</p>
        </button>
        <button @click="changeImage('cards')" :class="option === 'cards' ? 'selected' : ''">
          <h3>Cards</h3>
          <p>Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.</p>
        </button>
      </div>
      <div class="right-box">
        <div class="dynamic-image">
          <img :src="currentImage" :class="{ 'slide-in': showImage }" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import HomepageHeader from '../cmps/HomepageHeader.vue'

export default {
  name: 'home',
  data() {
    return {
      currentImage: 'https://images.ctfassets.net/rz1oowkt5gyp/3N2U3C71rApm61cGFxnc2E/970b010002488a09a420282df5e7b43a/Carousel_Image_Boards_2x.png?w=1536&fm=webp',
      showImage: false,
      option: 'boards',
    }
  },
  computed: {},
  created() {},
  methods: {
    changeImage(option) {
      this.option = option

      switch (option) {
        case 'boards':
          this.currentImage = 'https://images.ctfassets.net/rz1oowkt5gyp/3N2U3C71rApm61cGFxnc2E/970b010002488a09a420282df5e7b43a/Carousel_Image_Boards_2x.png?w=1536&fm=webp'
          break
        case 'lists':
          this.currentImage = 'https://images.ctfassets.net/rz1oowkt5gyp/4U0VUZYX2tQmB5KVGxBabp/7321ac088fe8ec39dbe3069c47d7df99/Carousel_Image_Lists_2x.png?w=1536&fm=webp'
          break
        case 'cards':
          this.currentImage = 'https://images.ctfassets.net/rz1oowkt5gyp/26CA6JZeRgoOK4nuRHnIlY/060702a80cf7c3be3651d9297d196267/Carousel_Image_Cards_2x.png?w=1536&fm=webp'
          break
        default:
          this.currentImage = 'https://images.ctfassets.net/rz1oowkt5gyp/3N2U3C71rApm61cGFxnc2E/970b010002488a09a420282df5e7b43a/Carousel_Image_Boards_2x.png?w=1536&fm=webp'
      }
      this.showImage = true
    },
  },
  components: { HomepageHeader },
}
</script>
