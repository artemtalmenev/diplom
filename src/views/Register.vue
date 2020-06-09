<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Регистрация риэлтора</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
      >
      <label for="email">Email</label>
      <small 
      class="helper-text invalid"
      v-if="$v.email.$dirty && !$v.email.required"
      >Поле Email не заполнено</small>
      <small 
      class="helper-text invalid"
      v-else-if="$v.email.$dirty && !$v.email.email"
      >Введите корректный Email</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
      >
      <label for="password">Пароль</label>
      <small 
      class="helper-text invalid"
      v-if="$v.password.$dirty && !$v.password.required"
      >Введите пароль</small>
      <small 
      class="helper-text invalid"
      v-else-if="$v.password.$dirty && !$v.password.minLength"
      >Пароль должен содержать минимум {{$v.password.$params.minLength.min}} знаков. Сейчас в нем {{password.length}} знаков</small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
      >
      <label for="name">Имя</label>
      <small 
      class="helper-text invalid"
      v-if="$v.name.$dirty && !$v.name.required"
      >Введите Имя</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree" />
        <span>С правилами согласен</span>
      </label>
    </p>
    <div class="switch">
    <label>
      Риэлтор
      <input type="checkbox" v-model="role" />
      <span class="lever"></span>
      Директор
    </label>
  </div>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect blue waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/">Войти!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  metaInfo() {
    return {
    title: this.$title('Registration')
    } 
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
    role: false
  }),
  validations: {
    email: {email, required},
    password:{required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        role: this.role
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/home')
      } catch (e) {}
    }
  }
}
</script>
