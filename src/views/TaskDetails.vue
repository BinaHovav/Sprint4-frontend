<template>
  <section class="backdrop" v-if="task">
    <section class="task-details">
      <a class="btn-icon-close" @click="onSaveTask"></a>
      <div class="task-cover" :class="task.cover">
        <div class="task-cover-menu">
          <a class="task-cover-btn">
            <span class="btn-icon-cover"></span>
            <span class="task-cover-txt">Cover</span>
          </a>
        </div>
      </div>
      <div class="task-header">
        <input type="text" v-model="task.title">
      </div>
      <div class="task-main">
        <div class="task-details-data flex">
          <div class="task-details-members">Members:
            <template class="flex">
              <div v-for="member in task.members">{{ member.fullname }} |</div>
            </template>
          </div>
          <div class="task-details-labels">Labels:
            <template class="flex">
              <div v-for="label in task.labels" :class="label.color">{{ label.title }} |</div>
            </template>
          </div>
          <div class="task-details-notifications">Notification:
            <template class="flex">
              <div v-for="member in task.members">{{ member.fullname }} |</div>
            </template>
          </div>
          <div class="task-details-notifications">Due date:
            <template class="flex">
              <div>{{ task.dueDate }}</div>
            </template>
          </div>
        </div>
        <div class="task-description flex column">
            Description
            <textarea v-model="task.description"></textarea>
        </div>
      </div>
      <div class="task-sidebar">
        <div class="task-sidebar-add">
          Add to card
          <a class="task-btn-link ">
            <span class="btn-link-members"></span>
            <span class="">Members</span>
          </a>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'TaskDetails',
  data() {
    return {
      task: {}
    }
  },
  computed: {},
  created() {
    const boardId = this.$route.params.id
    const taskId = this.$route.params.taskId
    console.log('this.task', this.task)
    this.task = {
      id: 'c101',
      title: 'Market Research',
      description: 'Conduct an in-depth market analysis to identify potential opportunities, target markets, and competitor solutions in the gas station automation industry.',
      members: [
        {
          _id: 'u101',
          fullname: 'Meitar Mor',
          imgUrl: '',
        },
        {
          _id: 'u102',
          fullname: 'Tomer Appelman',
          imgUrl: '',
        },
        {
          _id: 'u103',
          fullname: 'Bina Hovav',
          imgUrl: '',
        },
      ],
      labels: [
        {
          title: 'Research',
          color: 'yellow'
        }, {
          title: 'Planning',
          color: 'orange'
        }],
      dueDate: 1690303727,
      checklists: [
        {
          title: 'Todo',
          todos: [
            { id: 't101', txt: 'Gather data on existing gas station automation solutions', isDone: true },
            { id: 't102', txt: 'Identify key competitors and their offerings.', isDone: false },
            { id: 't103', txt: 'Analyze market trends and customer preferences.', isDone: false },
            { id: 't104', txt: 'Compile a comprehensive report on the market analysis findings.', isDone: false },
          ],
        },
      ],
      attachment: null,
      activity: [],
      cover: 'orange',
    }
  },
  methods: {
    onSaveTask(){
      console.log('task:  ',this.task);
    }
  },
}
</script>
