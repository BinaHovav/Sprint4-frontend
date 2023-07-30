<template>
  <div id="mySidenav" class="sidenav">
    <div class="topSidenav">
      <span v-if="showBackIcon" class="back-icon" @click="openMenuOption('default')">
        <i class="fas fa-chevron-left"></i>
      </span>
      <span class="menu-text">{{ menuText }}</span>
      <a href="javascript:void(0)" class="closebtn" @click="closeRightNav">&times;</a>
    </div>

    <div v-if="currentMenuContent === 'default'">
      <div class="sidenavButtons">
        <div class="about-button">
          <span class="trello-icon"></span>
          <button @click="openMenuOption('about')">About this board</button>
        </div>
        <div class="change-bcg-button">
          <img :src="board.imgUrl" />
          <button @click="openMenuOption('changeBackground')">Change background</button>
        </div>
        <button @click="openMenuOption('activity')">Activity</button>
      </div>
    </div>

    <div v-else-if="currentMenuContent === 'about'">
      <p>Gas station robotics project aims to automate fueling processes, enhance safety, and optimize operations using innovative robotic technologies and task management.</p>
    </div>

    <div v-else-if="currentMenuContent === 'changeBackground'">
      <div class="background-options">
        <div v-for="background in backgroundOptions" :key="background">
          <img :src="background" alt="Background" @click="changeBackground(background)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../services/event-bus.service'

export default {
  name: 'RightMenu',
  props: ['board'],

  data() {
    return {
      currMenuOption: 'default',
      menuOptions: {
        default: 'Menu',
        about: 'About this board',
        changeBackground: 'Change background',
        activity: 'Activity',
      },
      menuText: 'Menu',
    }
  },
  methods: {
    openMenuOption(option) {
      this.currMenuOption = option
      this.menuText = this.menuOptions[option]
    },
    changeBackground(backgroundImg) {
      this.board.imgUrl = backgroundImg
      this.$emit('updateBoard', this.board)
      eventBus.emit('backgroundChange')
    },
    openRightNav() {
      document.getElementById('mySidenav').style.width = '335px'
    },
    closeRightNav() {
      document.getElementById('mySidenav').style.width = '0'
    },
  },
  computed: {
    currentMenuContent() {
      if (this.currMenuOption === 'default') {
        return 'default'
      } else if (this.currMenuOption === 'about') {
        return 'about'
      } else if (this.currMenuOption === 'changeBackground') {
        return 'changeBackground'
      }
    },
    showBackIcon() {
      return this.currMenuOption !== 'default'
    },
    backgroundOptions() {
      return [
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690460257/gradient_wresqa.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690460260/Screenshot_2023-07-27_at_15.16.27_dziz4h.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690460839/ren-ran-Jy6luiLBsrk-unsplash_f92t1z.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690460927/ankush-minda-7KKQG0eB_TI-unsplash_u7drj5.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446239/martin-martz-voOla3T8TAM-unsplash_uwhvl2.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446242/marek-piwnicki-FFofrEuXsL4-unsplash_vnnykd.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446239/javier-miranda-kBU5APay4T0-unsplash_iscwqp.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446244/marek-piwnicki-5MVnLlI3Flg-unsplash_cyqyb6.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446241/marek-piwnicki-pjf3gGDvTeM-unsplash_ww11qq.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690442303/jefferson-sees-XbeDTBjTbME-unsplash_g3n7hb.jpg',
      ]
    },
  },
}
</script>
