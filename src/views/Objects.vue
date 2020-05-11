<template>
  <div>
  <div class="page-title">
    <h3>{{'Objects' | localize}}</h3>
  </div>

  <Loader v-if="loading" />

  <p class="center" v-else-if="!categories.length">{{'Categories_NoCategoriesYet' | localize}}. <router-link to="/categories">{{'AddNewCategory' | localize}}</router-link></p>

  <form class="form" v-else @submit.prevent="handleSubmit">
    <div class="input-field" >
      <select ref="select" v-model="category">
        <option

      v-for="c in categories"
      :key="c.id"
      :value="c.id"
        
        >{{c.title}}</option>
      </select>
      <label>{{'Categories_SelectACategory' | localize}}</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
        />
        <span>{{'Income' | localize}}</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
        />
        <span>{{'Outcome' | localize}}</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
      >
      <label for="amount">{{'History_TableAmount' | localize}}</label>
      <span 
              v-if="$v.amount.$dirty && !$v.amount.minValue"
              class="helper-text invalid">
              
              {{'Categories_MinimumValue' | localize}}: {{$v.amount.$params.minValue.min}}
              </span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
      >
      <label for="description">{{'Description' | localize}}</label>
       <span 
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >
                {{'EnterDescription' | localize}}
       </span>
    </div>

    <div class="input-field">
    <button class="btn waves-effect blue waves-ligh" @click="onPickFile">Загрузить файл</button>
      <input
          type="file"
          style="display: none"
          ref="fileInput"
          accept="image/*"
          @change="onFilePicked"
      >
    </div>
    <div class="input-field">
      <img :src="imageUrl" height="150">
    </div>

    <button class="btn waves-effect blue waves-light" type="submit">
      {{'Create' | localize}}
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'objects',
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'income',
    amount: 1,
    imageUrl: '',
    description: '',
    image: null
  }),
  validations : {
    amount: {minValue: minValue(1)},
    description: {required},
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (!this.image) {
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            image: this.image,
            type: this.type,
            date: new Date().toJSON()
        })
        const bill = this.type === 'income'
          ? this.info.bill + this.amount
          :this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          this.$message(localizeFilter('RecordCreatedSuccessfully'))
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}

      } else {
        this.$message(`${localizeFilter('NotEnoughFundsInTheAccount')} (${this.amount - this.info.bill})`)
      }
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert ('Файл не корректен')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
