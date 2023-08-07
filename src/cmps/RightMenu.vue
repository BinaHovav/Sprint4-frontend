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

        <div class="board-menu-content js-board-menu-content-wrapper">
          <div class="board-menu-content-frame u-fancy-scrollbar">
            <ul class="board-menu-navigation" v-if="currMenuOption === 'default'">
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
              <hr class="hr-line" />
              <li class="board-menu-navigation-item">
                <button class="board-menu-navigation-item-link-activity">
                  <a @click="openMenuOption('activity')">Activity</a>
                </button>
              </li>
            </ul>

            <div v-else-if="currMenuOption === 'about'">
              <div class="board-admins">
                <span class="admin-icon"></span>
                Board admins
              </div>
              <div class="board-admins-details">
                <div class="admin-logo">
                  <img src="https://trello-members.s3.amazonaws.com/64b64dd31b313a8eba0f9341/3e7f20613b5c14501f9c6c728ac51b45/50.png" />
                </div>
                <div class="admin-names">
                  <p class="fullname">Bina Hovav</p>
                  <p class="email">@binahovav</p>
                </div>
              </div>
              <div class="board-description">
                <div class="description">
                  <span v-icon="'description'"></span>
                  <span>Description</span>
                </div>
                <p>Gas station robotics project aims to automate fueling processes, enhance safety, and optimize operations using innovative robotic technologies and task management.</p>
              </div>
            </div>
            <div v-else-if="currMenuOption === 'activity'" class="activities">
              <div v-for="activity in board.activities" class="activity-container">
                <div class="user-img">
                  <img class="member-img" :src="activity.by?.imgUrl" :title="activity.by?.fullname" />
                </div>
                <div class="action">
                  <span v-if="activity.action.type === 'add task'">
                    <span class="fullname">{{ activity.by?.fullname }}</span> {{ activity.action?.command }}
                    <span class="link" @click="link(activity.action.componentId, activity.action.groupId)">
                      {{ activity.action.span }}</span>
                    {{ activity.action?.txt }}</span>
                  <span v-else-if="activity.action.type === 'due date'">
                    <span class="fullname">{{ activity.by?.fullname }}</span> {{ activity.action?.command }}
                    <span class="link" @click="link(activity.action.componentId, activity.action.groupId)">
                      {{ activity.action.span }}</span>
                    {{ activity.action?.txt }}
                  </span>
                  <span v-else>
                    <span class="fullname">{{ activity.by?.fullname }}</span> {{ activity.action?.type }}
                    {{ activity.action?.txt }}
                    <span class="link" @click="link(activity.action.componentId, activity.action.groupId)">
                      {{ activity.action.span }}</span>
                  </span>
                  <br>
                  <span class="date">{{ getActivityTime(activity.date) }}</span>
                </div>
              </div>
            </div>
            <div class="sub-options" v-else-if="currMenuOption === 'changeBackground'">
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

              <div class="color-option-list" v-else-if="currentSubmenu === 'colors'">
                <div class="color-gradient-list" v-for="background in backgroundColors" :key="background">
                  <img :src="background" alt="Background" @click="changeBackground(background)" />
                  <!-- <span class="check-icon"></span> -->
                </div>
              </div>
            </div>
            <button v-if="currentSubmenu === 'colors' || currentSubmenu === 'photos'" @click="goBack"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      prevSubMenuOption: null,
      currSubMenuOption: 'default',
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

    openSubmenu(option) {
      this.prevSubMenuOption = this.currSubMenuOption
      this.menuText = this.subMenuOptions[option]

      this.currentSubmenu = this.currentSubmenu === option ? null : option
    },
    goBack() {
      if (this.currentSubmenu !== null) {
        this.currentSubmenu = null
      } else if (this.prevMenuOption !== null) {
        this.currMenuOption = this.prevMenuOption
        this.prevMenuOption = null
        this.menuText = this.menuOptions[this.currMenuOption]
      } else {
        this.currMenuOption = 'changeBackground'
        this.menuText = this.menuOptions[this.currMenuOption]
      }
    },
    goBackToChangeBackgroundMenu() {
      this.currentSubmenu = null
    },
    changeBackground(backgroundImg) {
      const board = JSON.parse(JSON.stringify(this.board))
      board.imgUrl = backgroundImg
      const action = { type: 'changed', txt: 'the background of this board', componentId: '', movedCmp: '', movedUser: '' }
      this.$emit('updateBoard', board, action)
    },
    closeRightNav() {
      this.$emit('closeMenu')
    },
    getActivityTime(timeStamp) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const dateObj = new Date(timeStamp)
      const month = months[dateObj.getMonth()]
      const day = dateObj.getDate()
      const hours = dateObj.getHours()
      const minutes = dateObj.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours % 12 || 12
      const displayMinutes = minutes.toString().padStart(2, '0')
      const formattedDate = `${month} ${day} at ${displayHours}:${displayMinutes} ${ampm}`
      return formattedDate
    },
    link(taskId, groupId) {
      this.$router.push(`/board/${this.board._id}/group/${groupId}/task/${taskId}`)
    }
  },
  computed: {
    showBackIcon() {
      return this.currMenuOption !== 'default' && this.prevMenuOption !== null
    },
    backgroundOptions() {
      return [
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392868/tobias-reich-wJTj-hVQZfo-unsplash_c5vimo.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392868/steven-van-elk-1cFPr3n13cI-unsplash_pkr0zf.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691394885/tobias-reich-cBTuyMkjAYc-unsplash_swrh6v.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392867/stephen-leonardi-BQsHQ3MJ-zM-unsplash_ehbqnw.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691074936/marek-piwnicki-H5cFBKV5czo-unsplash_peligp.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392867/sebastian-svenson-lCsL76JhNlQ-unsplash_l8bpwl.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392867/stephen-leonardi-1YjP9WmcAzI-unsplash_zgblpx.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392867/sir-simo-RlfePHKmm5w-unsplash_fben2m.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392867/martin-martz-HWImspFMiV4-unsplash_ta4l6n.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392867/martin-martz-voOla3T8TAM-unsplash_qzqpir.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392867/martin-martz-9-0W7HV-5NI-unsplash_mt22hu.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392866/martin-martz-0rZdaEtmKnU-unsplash_id2yiy.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392866/marek-piwnicki-o2Mm876Ud0s-unsplash_ydpzd2.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392866/marek-piwnicki-pjf3gGDvTeM-unsplash_vilfat.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392866/marek-piwnicki-TDv5nDeLX40-unsplash_lgg4fs.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392866/marek-piwnicki-xfixPcc5aOE-unsplash_1_nmv2xw.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392866/marek-piwnicki-FFofrEuXsL4-unsplash_jajk1c.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392866/marek-piwnicki-DpV5SAHNj8E-unsplash_iy1fjz.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392865/john-towner-xUFQ8iKcY-o-unsplash_yai7zw.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392865/marek-piwnicki-5MVnLlI3Flg-unsplash_kfzdim.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392865/allison-saeng-OjeoELrs6IE-unsplash_qdthji.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392865/allison-saeng-BJFRrEkkV9c-unsplash_mer4bt.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392865/fabio-sasso-UgpCjt4XLTY-unsplash_ugkyzj.jpg',
        'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1691392865/javier-miranda-kBU5APay4T0-unsplash_e1pcs2.jpg',
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
    colors() {
      return ['https://a.trellocdn.com/prgb/assets/1cbae06b1a428ad6234a.svg', 'https://a.trellocdn.com/prgb/assets/d106776cb297f000b1f4.svg']
    },
  },
}
</script>
