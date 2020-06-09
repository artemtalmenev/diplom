<template>
  <table class="highlight responsive-table">
      <thead>
      <tr>
        <th>#</th>
        <th>{{'Users' | localize}}</th>
        <th>{{'View' | localize}}</th>
      </tr>
      </thead>
      
      <tbody>
      <tr v-for="(user, id) of users" :key="user.id">
        <td>{{ id+1 }}</td>
        <td>{{ user.name }}</td>
        <td>
          <button v-tooltip="'Открыть таблицу пользователя'" class="btn-small btn blue" @click="$router.push('/tasks/' + user.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td> 
      </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  props: {
    users: {
      required: true,
      type: Array
    }
  }
}
</script>
