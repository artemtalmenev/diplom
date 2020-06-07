<template>
  <div>
  <div class="page-title">
    <h3>{{'Users' | localize}}</h3>
  </div>

  <Loader v-if="loading" />

  <p class="center" v-else-if="!users.length">
    {{'Users_Not_Yet' | localize}}.
    </p>

  <section v-else>
    <UsersTable :users="users" />


  </section>
</div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import UsersTable from '@/components/UsersTable'
import {Pie} from 'vue-chartjs'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'users',
  metaInfo() {
    return {
    title: this.$title('Users')
    } 
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    users: []
  }),
  async mounted() {
    this.users = await this.$store.dispatch('fetchUsers')
    
    this.loading = false
  },

  components: {
    UsersTable
  }
}
</script>


