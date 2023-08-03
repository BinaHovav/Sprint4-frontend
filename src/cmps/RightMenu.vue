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
            <ul class="board-menu-navigation" v-if="currentMenuOption === 'default'">
              <li class="board-menu-navigation-item">
                <button class="board-menu-navigation-item-link-about">
                  <span v-icon="'aboutRightMenu'"></span>
                  <a @click="openMenuOption('about')">About this board</a>
                </button>
              </li>
              <li class="board-menu-navigation-item change-bg">
                <button class="board-menu-navigation-item-link" @click="openMenuOption('changeBackground')">
                  <img :src="board.imgUrl" />
                  <a>Change background</a>
                </button>
              </li>
              <li class="board-menu-navigation-item">
                <button class="board-menu-navigation-item-link-activity">
                  <a @click="openMenuOption('activity')">Activity</a>
                </button>
              </li>
            </ul>

            <div v-else-if="currentMenuOption === 'about'">
              <p>Gas station robotics project aims to automate fueling processes, enhance safety, and optimize operations using innovative robotic technologies and task management.</p>
            </div>

            <div class="sub-options" v-else-if="currentMenuOption === 'changeBackground'">
              <div v-if="currentSubmenu === null">
                <div class="background-options">
                  <div class="photos-option">
                    <img src="https://trello.com/assets/8f9c1323c9c16601a9a4.jpg" @click="openSubmenu('photos')" />
                    <h3>Photos</h3>
                  </div>
                  <div class="colors-option">
                    <img src="https://trello.com/assets/97db30fe74a58b7b7a18.png" @click="openSubmenu('colors')" />
                    <h3>Colors</h3>
                  </div>
                </div>
              </div>
              <div class="photo-option" v-else-if="currentSubmenu === 'photos'">
                <div class="photo-option-list" v-for="background in backgroundOptions" :key="background">
                  <img :src="background" alt="Background" @click="changeBackground(background)" />
                </div>
              </div>

              <div class="color-option" v-else-if="currentSubmenu === 'colors'">
                <div class="color-option-list" v-for="background in backgroundColors" :key="background">
                  <img :src="background" alt="Background" @click="changeBackground(background)" />
                </div>
              </div>
            </div>
            <button v-if="currentSubmenu === 'colors' || currentSubmenu === 'photos'" @click="goBackToChangeBackgroundMenu">Back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Unsplash } from '../services/unsplash'

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
      prevSebMenuOption: null,
      currSebMenuOption: 'default',
      subMenuOptions: {
        photos: 'Photos',
        colors: 'Colors',
      },
      currentSubmenu: null,
      menuText: 'Menu',
    }
  },
  methods: {
    openMenuOption(option) {
      this.prevMenuOption = this.currMenuOption
      this.currMenuOption = option
      this.menuText = this.menuOptions[option]
    },
    openSubmenu(submenu) {
      if (this.currentSubmenu === submenu) {
        this.currentSubmenu = null
      } else {
        this.currentSubmenu = submenu
      }
    },

    goBack() {
      if (this.prevMenuOption) {
        this.currMenuOption = this.prevMenuOption
        this.prevMenuOption = null
        this.menuText = this.menuOptions[this.currMenuOption]
      }
    },
    goBackToChangeBackgroundMenu() {
      this.currentSubmenu = null
    },
    changeBackground(backgroundImg) {
      this.board.imgUrl = backgroundImg
      const action= { type: 'changed', txt: 'the background of this board', componentId: '', movedCmp: '', movedUser: '' }
      this.$emit('updateBoard', this.board , action)
    },
    closeRightNav() {
      this.$emit('closeMenu')
    },
  },
  computed: {
    currentMenuOption() {
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
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690460260/Screenshot_2023-07-27_at_15.16.27_dziz4h.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690460839/ren-ran-Jy6luiLBsrk-unsplash_f92t1z.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690460927/ankush-minda-7KKQG0eB_TI-unsplash_u7drj5.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446239/martin-martz-voOla3T8TAM-unsplash_uwhvl2.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446242/marek-piwnicki-FFofrEuXsL4-unsplash_vnnykd.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446239/javier-miranda-kBU5APay4T0-unsplash_iscwqp.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446241/marek-piwnicki-pjf3gGDvTeM-unsplash_ww11qq.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690442303/jefferson-sees-XbeDTBjTbME-unsplash_g3n7hb.jpg',
      ]
    },
    backgroundColors() {
      return [
        'https://a.trellocdn.com/prgb/assets/1cbae06b1a428ad6234a.svg',
        'https://a.trellocdn.com/prgb/assets/d106776cb297f000b1f4.svg',
        'https://a.trellocdn.com/prgb/assets/8ab3b35f3a786bb6cdac.svg',
        'https://a.trellocdn.com/prgb/assets/a7c521b94eb153008f2d.svg',
        'https://a.trellocdn.com/prgb/assets/aec98becb6d15a5fc95e.svg',
        'https://a.trellocdn.com/prgb/assets/b75536d1afb40980ca57.svg',
        'https://a.trellocdn.com/prgb/assets/92e67a71aaaa98dea5ad.svg',
        'https://a.trellocdn.com/prgb/assets/941e9fef7b1b1129b904.svg',
      ]
    },
  },
}
</script>
