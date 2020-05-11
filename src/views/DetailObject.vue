<template>
  <div>
    <Loader v-if="loading"/>
  <div v-else-if="category">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">{{'History' | localize}}</router-link>
      
    </div>
    <div class="row">
      <div class="col s12 m6">
       
          <div class="card-content black-text">
            <p>{{'Description' | localize}}: {{category.title}}</p>
            <p>{{'History_TableAmount' | localize}}: {{category.limit}}</p>
            
            <p>
              <img :src="category.image" width="100%"/>
            </p>
          </div>
        
      </div>
    </div>
  </div>
  <p class="center" v-else>Запись с id={{$route.params.id}} не найдена</p>
</div>
</template>

<script>
export default {
  name: 'detailobject',
  data: () => ({
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const category = await this.$store.dispatch('fetchCategoryById', id)
    this.category = {
      ...category
    }

    this.loading = false
  }
}
</script>
