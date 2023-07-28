<template>
  <section class="top-navbar">
    <nav class="flex justify-space-between align-center">
      <div class="board-title">
        <h1 class="fs18">{{ boardToDisplay?.title }}</h1>
      </div>
      <button class="btn-star"><span class="star"></span></button>
      <span>filter</span>
      <div>
        <div class="board-members" v-for="member in boardToDisplay?.members">
          <div><img :src="member.imgUrl" alt="member" /></div>
        </div>
      </div>
      <!-- <RightNavbar /> -->
      <div id="mySidenav" class="sidenav">
        <div class="topSidenav">
          <span>Menu</span>
          <a href="javascript:void(0)" class="closebtn" @click="closeRightNav">&times;</a>
        </div>
        <!-- <div class="sidenavButtons"> -->
        <div class="sidenavButtons" v-if="currMenuContent === 'default'">
          <button @click="openMenuOption('about')">About this board</button>
          <button @click="openMenuOption('changeBackground')">Change background</button>
          <button @click="openMenuOption('activity')">Activity</button>
        </div>
        <div v-else-if="currMenuContent === 'about'">
          <p>This board is about our wonderful project.</p>
          <a href="#">Go back</a>
        </div>
        <div v-else-if="currMenuContent === 'changeBackground'">
          <!-- Content for "Change background" -->
          <div class="background-options">
            <div v-for="background in backgroundOptions" :key="background">
              <img :src="background" alt="Background" @click="changeBackground(background)" />
            </div>
          </div>
          <!-- <a href="#" @click="openRightNav('default')">Go back</a> -->
          <!-- </div> -->
        </div>
      </div>
      <button class="open-menu-btn" @click="openRightNav"></button>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'TopNavbar',
  data() {
    return {
      currMenuContent: 'default',
      backgroundOptions: [],
    }
  },
  methods: {
    openRightNav() {
      document.getElementById('mySidenav').style.width = '335px'
    },
    closeRightNav() {
      document.getElementById('mySidenav').style.width = '0'
    },
    openMenuOption(option) {
      switch (option) {
        case 'about':
          this.currMenuContent = 'about'
          break
        case 'changeBackground':
          this.currMenuContent = 'changeBackground'
          break
        case 'activity':
          this.currMenuContent = 'activity'
        default:
          break
      }
    },
    changeBackground(background) {
      // Implement the logic to apply the selected background to your board
      // For example, you can use CSS to change the background image of the board container.
      // You can store the selected background in a data property and use it in your CSS.
    },
  },
  computed: {},
}
</script>
