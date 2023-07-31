<template>
  <div ref="menu" class="board-menu js-fill-board-menu" :class="{ 'show-menu': showMenu }">
    <div class="board-menu-container">
      <div class="board-menu-tab-content">
        <div class="board-menu-header js-board-menu-title is-in-frame is-board-menu-default-view">
          <div class="board-menu-header-content">
            <a v-if="showBackIcon" class="board-menu-header-back-button" @click="goBack">
              <i class="fas fa-chevron-left"></i>
            </a>
            <a v-else class="board-menu-header-back-button" @click="closeRightNav"></a>

            <h3 class="board-menu-header-title">{{ menuText }}</h3>
            <a href="javascript:void(0)" class="board-menu-header-close-button" @click="closeRightNav"></a>
          </div>
        </div>
        <div class="board-menu-content u-fancy-scrollbar js-board-menu-content-wrapper">
          <div class="board-menu-content-frame">
            <ul class="board-menu-navigation" v-if="currentMenuContent === 'default'">
              <li class="board-menu-navigation-item">
                <button class="board-menu-navigation-item-link-about">
                  <span v-icon="'aboutRightMenu'"></span>
                  <a @click="openMenuOption('about')">About this board</a>
                </button>
              </li>
              <li class="board-menu-navigation-item">
                <button class="board-menu-navigation-item-link">
                  <img :src="board.imgUrl" />
                  <a @click="openMenuOption('changeBackground')">Change background</a>
                </button>
              </li>
              <li class="board-menu-navigation-item">
                <button class="board-menu-navigation-item-link-activity">
                  <a @click="openMenuOption('activity')">Activity</a>
                </button>
              </li>
            </ul>

            <div v-else-if="currentMenuContent === 'about'">
              <p>Gas station robotics project aims to automate fueling processes, enhance safety, and optimize operations using innovative robotic technologies and task management.</p>
            </div>

            <div v-else-if="currentMenuContent === 'changeBackground'">
              <div class="background-options">
                <div v-for="background in backgroundOptions" :key="background">
                  <img :src="background" alt="Background" @click="changeBackground(background)" />
                </div>
              </div>
              <!-- </div> -->
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../services/event-bus.service'

export default {
  name: 'RightMenu',
  props: ['board', 'showMenu'],

  data() {
    return {
      currMenuOption: 'default',
      prevMenuOption: null,
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
      this.prevMenuOption = this.currMenuOption
      this.currMenuOption = option
      this.menuText = this.menuOptions[option]
    },
    goBack() {
      if (this.prevMenuOption) {
        this.currMenuOption = this.prevMenuOption
        this.prevMenuOption = null
        this.menuText = this.menuOptions[this.currMenuOption]
      }
    },
    changeBackground(backgroundImg) {
      this.board.imgUrl = backgroundImg
      this.$emit('updateBoard', this.board)
    },
    closeRightNav() {
      this.$emit('closeMenu')
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
      return this.currMenuOption !== 'default' && this.prevMenuOption !== null
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
