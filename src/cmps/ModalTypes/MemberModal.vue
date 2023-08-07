<template>
  <div class="members-container">
    <div>
      <div>
        <input class="members-search" type="text" placeholder="Search members" v-focus>
        <div class="members-list">
          <h4>Board members</h4>
          <ul>
            <li v-for="member in info.board.members">
              <a @click.stop="toggleTaskMember(member)">
                <span class="member-img"><img :src="member.imgUrl"></span>
                <span class="member-fullname">{{ member.fullname }}</span>
                <span v-if="info.task.members.includes(member._id)" class="member-checked"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
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
    toggleTaskMember(member) {
      const groupId = this.$route.params.groupId
      if (this.info.task.members.includes(member._id)) {
        var action = { type: 'removed', txt: `${member.fullname} from `, span: this.info.task.title, componentId: this.info.task.id, groupId: groupId, movedCmp: '', movedUser: '' }
        if (this.loggedinUser._id === member._id) action = { type: 'left', txt: ``, span: this.info.task.title, componentId: this.info.task.id, groupId: groupId, movedCmp: '', movedUser: '' }
        const idx = this.info.task.members.findIndex(tMember => tMember === member._id)
        this.info.task.members.splice(idx, 1)
      } else {
        var action = { type: 'added', txt: `${member.fullname} to `, span: this.info.task.title, componentId: this.info.task.id, groupId: groupId, movedCmp: '', movedUser: '' }
        if (this.loggedinUser._id === member._id) action = { type: 'joined', txt: ``, span: this.info.task.title, componentId: this.info.task.id, groupId: groupId, movedCmp: '', movedUser: '' }
        this.info.task.members.push(member._id)
      }
      this.$emit('setInfo', this.info, action)
    }
  },
  computed: {
    loggedinUser() { return this.$store.getters.loggedinUser }
  },
}
</script>

  