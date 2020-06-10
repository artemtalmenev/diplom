<template>
  <div class="col s12 m6">
        <div class="CategoryEdit">
          <div class="page-subtitle">
            <h4>{{'Categories_Edit' | localize}}</h4>
          </div>

          <form @submit.prevent="submitHandler">
            <div class="input-field" >
              <select ref="select" v-model="current">
                <option
                v-for="c of categories"
                :key="c.id"
                :value="c.id"
                >{{c.title}}</option>
              </select>
              <label>{{'Categories_SelectACategory' | localize}}</label>
            </div>

           <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model="title"
                  :class="{invalid: $v.title.$dirty && !$v.title.required}"
              >
              <label for="name">{{'Categories_Title' | localize}}</label>
                <span 
                  v-if="$v.title.$dirty && !$v.title.required"
                  class="helper-text invalid"
                >
                {{'Categories_EnterACategoryName' | localize}}</span>
              </div>
              <div class="input-field">
              <input
                  id="adress"
                  type="text"
                  v-model="adress"
                  :class="{invalid: $v.adress.$dirty && !$v.adress.required}"
              >
                <span 
                  v-if="$v.adress.$dirty && !$v.adress.required"
                  class="helper-text invalid"
                >
                {{'Enter_Price' | localize}}</span>
              </div>
              <div class="input-field">
              <input
                  id="description"
                  type="text"
                  v-model="description"
                  :class="{invalid: $v.description.$dirty && !$v.description.required}"
              >
                <span 
                  v-if="$v.description.$dirty && !$v.description.required"
                  class="helper-text invalid"
                >
                {{'Enter_Description' | localize}}</span>
              </div>
            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
              >
              <label for="limit">{{'Price' | localize}}</label>
              <span 
              v-if="$v.title.$dirty && !$v.limit.minValue"
              class="helper-text invalid">
              
              {{'Enter_Price' | localize}}: {{$v.limit.$params.minValue.min}}
              </span>
            </div>
            <button class="btn waves-effect blue waves-light" type="submit">
              {{'Categories_Refresh' | localize}}
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    description: '',
    adress: '',
    limit: 100,
    current: null
  }),
  validations : {
    title: {required},
    description: {required},
    adress: {required},
    limit: {minValue: minValue(100)}
  },
  watch: {
    current(catId) {
      const {title, limit, description, adress} = this.categories.find(c => c.id === catId)
      this.title = title
      this.description = description
      this.adress = adress
      this.limit = limit
    }
  },
  created() {
    const {id, title, limit, description, adress} = this.categories[0]
    this.current = id
    this.title = title
    this.description = description
    this.adress = adress
    this.limit = limit
  },
  methods: {
   async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData ={
          id: this.current,
          title: this.title,
          description: this.description,
          adress: this.adress,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(localizeFilter('Categories_CategoryHasBeenUpdated'))
        this.$emit('update', categoryData)
      } catch (e) {}
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
