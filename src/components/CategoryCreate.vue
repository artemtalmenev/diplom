<template>
  <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>{{'Categories_Create' | localize}}</h4>
          </div>

          <form @submit.prevent="submitHandler">
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
              <label for="desc">{{'Adress' | localize}}</label>
              <span 
              v-if="$v.adress.$dirty && !$v.adress.required"
              class="helper-text invalid"

              >
              {{'Enter_AdressObject' | localize}}</span>
            </div>
            <div class="input-field">
              <input
                  id="description"
                  type="text"
                  v-model="description"
                  :class="{invalid: $v.description.$dirty && !$v.description.required}"
              >
              <label for="desc">{{'Description' | localize}}</label>
              <span 
              v-if="$v.description.$dirty && !$v.description.required"
              class="helper-text invalid"

              >
              {{'Categories_EnterACategoryName' | localize}}</span>
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
              
              {{'Categories_MinimumValue' | localize}}: {{$v.limit.$params.minValue.min}}
              </span>
            </div>
            <div class="input-field">
            <div class="btn waves-effect blue waves-ligh" type="submit" @click="onPickFile"> {{'Upload_File' | localize}}</div>
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
            <button class="btn waves-effect blue waves-light">
              {{'Categories_Create' | localize}}
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
  data: () => ({
    title: '',
    description: '',
    adress: '',
    limit: 100,
    imageUrl: '',
    image: null
  }),
  validations : {
    title: {required},
    description: {required},
    adress: {required},
    limit: {minValue: minValue(100)}
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          description: this.description,
          adress: this.adress,
          limit: this.limit,
          image: this.image
        })
        this.title = ''
        this.description = ''
        this.adress = ''
        this.limit = 100
        this.$v.$reset()
        this.$message(localizeFilter('Categories_CategoryHasBeenCreated'))
        this.$emit('created', category)
      } catch (e) {}
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
  }
}
</script>
