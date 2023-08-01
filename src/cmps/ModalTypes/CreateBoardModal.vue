<template>
  <div class="create-board-modal">
    <div class="create-board-header">
      <h2 class="create-board-title"></h2>
      <!-- <button>X</button> -->
    </div>
    <div class="create-board-modal-body">
      <div class="board-example">
        <img class="dynamic-board" :src="chosenBackground" />
        <img class="svg-board" src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" />
      </div>
      <div class="background-picker-container">
        <label>Background</label>
        <div class="background-picker">
          <!-- <span ></span> -->
          <!-- <div class="background-option"></div> -->
          <button class="background-option" v-for="background in backgroundOptions" :key="background">
            <img :src="background" alt="Background" @click="setBackground(background)" />
            <span class="check-icon"></span>
          </button>
        </div>
      </div>

      <div class="new-board-title">
        <label>Board title</label>
        <input type="text" class="title-input" v-model="newBoardTitle" />
      </div>

      <div class="create-board-btn">
        <button :style="createButtonStyle" @click="createBoard">Create</button>
      </div>
    </div>
  </div>
</template>
<script>
import { utilService } from '../../services/util.service.js'
// import { boardService } from '../../services/board.service.local'
import { boardService } from '../../services/board.service'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { getActionUpdateBoard, getActionAddBoard } from '../../store/board.store'

export default {
  props: ['board'],
  name: 'CreateBoardModal',
  data() {
    return {
      newBoardTitle: '',
      chosenBackground: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446242/marek-piwnicki-FFofrEuXsL4-unsplash_vnnykd.jpg',
      isTitleInputEmpty: true,
    }
  },
  watch: {
    newBoardTitle(value) {
      this.isTitleInputEmpty = value.trim().length === 0
    },
  },

  created() {
    // this.getLabel()
    // setTimeout(() => {
    //   this.$refs.titleInput.focus()
    // }, 200)
  },
  methods: {
    async createBoard() {
      if (this.isTitleInputEmpty) return

      const newBoard = boardService.getEmptyBoard()
      newBoard.title = this.newBoardTitle
      newBoard.imgUrl = this.chosenBackground
      try {
        const addedBoard = await this.$store.dispatch(getActionAddBoard(newBoard))
        this.$router.push(`/board/${addedBoard._id}`)
        this.$emit('closeModal')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot create board')
      }
    },
    setBackground(chosenBackground) {
      this.chosenBackground = chosenBackground
    },
  },
  computed: {
    createButtonStyle() {
      return {
        backgroundColor: this.isTitleInputEmpty ? '#091e4208' : '#0c66e4',
        color: this.isTitleInputEmpty ? '#091e424f' : '#ffffff',
      }
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
