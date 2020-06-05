<template>
<div>
  <Loader v-if="loading"/>
  <div v-else-if="task">
    <div class="breadcrumb-wrap">
      <router-link to="/task" class="breadcrumb">{{'Task' | localize}}</router-link>
      <a @click.prevent class="breadcrumb">
        {{ task.type === 'income' ? 'Income' : 'Outcome' | localize }}
      </a>
    </div>
  <section>
  <div class="container">
    <div class="right-container">
      <div class="gantt-selected-info">
        <div v-if="selectedTask">
          <h2>{{selectedTask.text}}</h2>
          <span><b>ID: </b>{{selectedTask.id}}</span><br/>
          <span><b>Прогресс: </b>{{selectedTask.progress|toPercent}}%</span><br/>
          <span><b>Дата начала: </b>{{selectedTask.start_date|niceDate}}</span><br/>
          <span><b>Дата конца: </b>{{selectedTask.end_date|niceDate}}</span><br/>
        </div>
        <div v-else class="select-task-prompt">
          <h2>Click any task</h2>
        </div>
      </div>
      <ul class="gantt-messages">
        <li class="gantt-message" v-for="message in messages" v-bind:key="index">{{message}}</li>
      </ul>
    </div>
    <gantt class="left-container" :tasks="tasks" @task-updated="logTaskUpdate" @link-updated="logLinkUpdate" @task-selected="selectTask"></gantt>
  </div>
  </section>
  </div>
  </div>
</template>

<script>
export default {
  name: 'tasks',
  metaInfo() {
    return {
    title: this.$title('History_Operation')
    } 
  },
  data: () => ({
    task: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const task = await this.$store.dispatch('fetchTaskById', id)
    const user = await this.$store.dispatch('fetchUserById', task.userId)
    task.images = JSON.parse(task.images)
    this.task = {
      ...task,
     userName: user.title
    }

    this.loading = false
  }
}
</script>
