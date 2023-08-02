<template>
  <main class="homepage-main-container">
    <div class="left-box">
      <h1>Mellow brings all your tasks, teammates, and tools together</h1>
      <p>Keep everything in the same place - even if your team isn’t.</p>
      <RouterLink to="/board" class="btn-try">Try Mellow!</RouterLink>
    </div>
    <div class="right-box">
      <img src="https://merllo-0m15.onrender.com/assets/TrelloUICollage_4x.193e8069.webp" />
    </div>
  </main>
</template>

<script>
import HomepageHeader from '../cmps/HomepageHeader.vue'

export default {
  name: 'home',
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {},
  components: { HomepageHeader },
}
</script>
