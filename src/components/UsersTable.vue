<template>
  <table class="highlight">
      <thead>
      <tr>
        <th>#</th>
        <th>{{'Users' | localize}}</th>
        <th>{{'History_TableObject' | localize}}</th>
        <th>{{'History_TableOpen' | localize}}</th>
      </tr>
      </thead>
      
      <tbody>
      <tr v-for="(user, idx) of users" :key="user.id">
        <td>{{ idx+1 }}</td>
        <td>{{ user.amount | currency('RUB') }}</td>
        <td>{{ user.categoryName }}</td>
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
