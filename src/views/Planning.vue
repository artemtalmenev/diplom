<template>
  <div>
  <div class="page-title">
    <h3>{{'Employee_Objects' | localize}} {{name}}</h3>
    <h4>{{info.bill | currency('RUB')}}</h4>
  </div>
  <Loader v-if="loading" />
  

  <p class="center" v-else-if="!categories.length">{{'Categories_NoCategoriesYet' | localize}}. <router-link to="/categories">{{'AddNewCategory' | localize}}</router-link></p>

  <section v-else>
    <div v-for="(cat) of categories" :key="cat.id">
      <p class="flow-text">
        <strong>{{cat.title}}:</strong>
        {{cat.spend | currency}} {{'Of' | localize}} {{cat.limit | currency}}
      </p>
      <div class="progress" v-tooltip="cat.tooltip">
        <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
        ></div>
      </div>
      
      <button class="btn waves-effect blue waves-light" @click="$router.push('/detailobject/' + cat.id)">
      {{'View_Object' | localize}}
      </button>
      
    </div>
  </section>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'planning',
  metaInfo() {
    return {
    title: this.$title('Employee_Objects')
    } 
  },
  data: () => ({
    loading: true,
    categories: []
  }),

  computed: {
    ...mapGetters(['info']),
    name() {
      return this.$store.getters.info.name
    }
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
      .filter(r => r.categoryId === cat.id)
      .filter(r => r.type === 'income')
      .reduce((total, record) => {
        return total += +record.amount
      }, 0)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 50
      ? 'red'
      : percent < 100 
        ? 'yellow'
        : 'green'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? localizeFilter('ExcessOn') : localizeFilter('Remains')} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
    
    this.loading = false
  }
}
</script>
