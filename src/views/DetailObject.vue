<template>
 <div class="col s12 m6">
  <div>
    <Loader v-if="loading"/>
  <div v-else-if="category">
    <div class="page-title">
    <div class="breadcrumb-wrap">
      <router-link to="/planning" class="breadcrumb"><i class="material-icons">arrow_back</i></router-link>
      <h3>{{'Object' | localize}} {{category.title}}</h3>
    </div>
    </div>
    <div class="row">
      <div class="col s12 m7">
        <div class="card">
          <div class="card-image">
            <img :src="category.image" width="100%"/>
            <router-link class="btn-floating halfway-fab waves-effect blue waves-light" to='/categories' v-tooltip="'Редактировать объект'"><i class="material-icons">create</i></router-link>
            </div>
            <div class="card-content">
              <p class="flow-text">{{'Adress' | localize}}: {{category.adress}}</p>
            
            <div class="card-content">
            <p class="flow-text">{{'Price_Object' | localize}}: {{category.limit}}₽</p>
            <div class="card-content">
            <p class="flow-text">{{'Description' | localize}}: {{category.description}}</p>
            </div>
            </div>
            </div> 
          </div>
        </div>
      </div>
     <!-- <TwentyTwenty
    :before="category.image"
    :after="category.image" /> -->
    </div>
  <p class="center" v-else>Запись с id={{$route.params.id}} не найдена</p>
</div>
 </div>
</template>

<script>
import TwentyTwenty from 'vue-twentytwenty'

export default {
  name: 'detailobject',
  metaInfo() {
    return {
    title: this.$title('Employee_Objects')
    } 
  },
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
  },
  components: {
    TwentyTwenty
  }
}
</script>
