<template>
  <ul class="sidenav app-sidenav lime lighten-2" :class="{open: value}" v-if="links">

      <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to='link.url'
      :exact='link.exact'
      >
        <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
      </router-link>
    </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ['value'],
  data: () => ({
    links: null
  }),
  mounted() {
    const array =  [
      {title: localizeFilter('Total_Bill'), url: '/home', exact: true, hasAccess: true},
      {title: localizeFilter('Employee_Objects'), url: '/planning', hasAccess: true},
      {title: localizeFilter('Property'), url: '/categories', hasAccess: true},
      {title: localizeFilter('Record_Objects'), url: '/objects', hasAccess: true},
      {title: localizeFilter('History_Operation'), url: '/history', hasAccess: true},
      {title: localizeFilter('My_Tasks'), url: '/task', hasAccess: true},
    ];
    if (localStorage.getItem('userRole') === 'Директор') {
      array.push({title: localizeFilter('Users'), url: '/users', hasAccess: true}, {title: localizeFilter('Registration_New'), url: '/register', hasAccess: true},)
    }
    this.links = array
  }
}
</script>
