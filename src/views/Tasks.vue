<template>
<div>
  <Loader v-if="loading"/>
  <div v-else-if="tasks">
    <div class="breadcrumb-wrap">
      <router-link to="/users" class="breadcrumb">{{'Users' | localize}}</router-link>
      <a @click.prevent class="breadcrumb">
        {{ 'User' | localize }}
      </a>
    </div>
  <section>
  <div class="container"> 
    <gantt class="left-container" :tasks="tasks" @task-updated="logTaskUpdate" @task-selected="selectTask"></gantt>
    <ul class="gantt-messages">
        <li class="gantt-message" v-for="message in messages" v-bind:key="index">{{message}}</li>
      </ul>
  </div>
  </section>
  </div>
  </div>
</template>

<script>
import Gantt from '@/components/Gantt';
import { gantt } from 'dhtmlx-gantt';

export default {
  name: 'tasks',
  components: {Gantt},
  metaInfo() {
    return {
    title: this.$title('Tasks_User')
    } 
  },
  data: () => ({
    loading: true,
    users: [],
    selectedTask: null,
    messages: [],
    userID: null,
    tasks: null
  }),
  async mounted() {
    const id = this.$route.params.id
    this.tasks = null
    gantt.clearAll()
    this.tasks = await this.$store.dispatch('fetchTasks', {id})
    this.userID = id
    this.loading = false
  },
  methods: {
    selectTask : function ( task ) {
      this.selectedTask = task
    },

    addMessage (message) {
      this.messages.unshift(message)
      if (this.messages.length > 40) {
        this.messages.pop()
      }
    },
 
    async logTaskUpdate (id, mode, task) {
      if (task["!nativeeditor_status"] === 'deleted') {
         await this.$store.dispatch('deleteTask',{
        userID: this.userID,
        taskID: task.id
        })
      } else if (task["!nativeeditor_status"] === 'updated') {
        await this.$store.dispatch('updateTask', {
        task: JSON.stringify(task),
        taskID: task.id,
        userID: this.userID
      })
      }
        else {
        await this.$store.dispatch('createTask', {
        task: JSON.stringify(task),
        id: task.id,
        userID: this.userID
      })
      }
      let text = (task && task.text ? ` (${task.text})`: '')
      let message = `Задача ${mode}: ${id} ${text}`
      this.addMessage(message)
    },
  },
  filters: {
    toPercent (val) {
      if(!val) return '0'
      return Math.round((+val) * 100)
    },
    niceDate (obj){
      return `${obj.getFullYear()} / ${obj.getMonth()} / ${obj.getDate()}`
    }
  }
}
</script>
<style>
.container {
    height: 100%;
    width: 100%;
  }
  .left-container {
    overflow: hidden;
    position: relative;

  }
  .right-container {
    border-right: 1px solid #cecece;
    float: right;
    height: 100%;
    width: 340px;
    box-shadow: 0 0 5px 2px #aaa;
    position: relative;
    z-index:2;
  }
  .gantt-messages {
    list-style-type: none;
    height: 50%;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 5px;
  }
  .gantt-messages > .gantt-message {
    background-color: #f4f4f4;
    box-shadow:inset 5px 0 #d69000;
    font-family: Geneva, Arial, Helvetica, sans-serif;
    font-size: 14px;
    margin: 5px 0;
    padding: 8px 0 8px 10px;
  }
  .gantt-selected-info {
    border-bottom: 1px solid #cecece;
    box-sizing: border-box;
    font-family: Geneva, Arial, Helvetica, sans-serif;
    height: 50%;
    line-height: 28px;
    padding: 10px;
  }
  .gantt-selected-info h2 {
    border-bottom: 1px solid #cecece;
  }
  .select-task-prompt h2{
    color: #d9d9d9;
  }
</style>
