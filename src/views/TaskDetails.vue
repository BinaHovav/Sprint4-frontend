<template>
    <section class="backdrop">
        <section class="task-details">
          <a class="btn-icon-close"></a>
          <div class="task-cover" :class="task.cover">
            <div class="task-cover-menu">
              <a class="task-cover-btn">
                <span class="btn-icon-cover"></span>
                Cover
              </a>
            </div>
          </div>
          <h2>hey</h2>
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
    console.log('test')
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
      labels: ['Research', 'Planning'],
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
  methods: {},
}
</script>
