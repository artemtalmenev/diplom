<template>
  <div>
  <div class="page-title">
    <h3>{{'Users' | localize}}</h3>
  </div>

  <Loader v-if="loading" />

  <p class="center" v-else-if="!tasks.length">
    {{'History_NoRecordsYet' | localize}}.
    <router-link to="/record">{{'History_AddFirst' | localize}}</router-link>
    </p>

  <section v-else>
    <UsersTable :tasks="items" />

    <Paginate 
    v-model="page"
    :page-count="pageCount"
    :click-handler="pageChangeHandler"
    :prev-text="'History_Prev' | localize"
    :next-text="'History_Next' | localize"
    :container-class="'pagination'"
    :page-class="'waves-effect'"
    />

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
    title: this.$title('History_Operation')
    } 
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    tasks: []
  }),
  async mounted() {
    this.tasks = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)
    
    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.tasks.map(task => {
      return {
        ...task,
        categoryName: categories.find(c => c.id === task.categoryId).title,
        typeClass: task.type === 'income' ? 'green' : 'red',
        typeText: task.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome'),
      }
    }))
    }
  },
  components: {
    UsersTable
  }
}
</script>


