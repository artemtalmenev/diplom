<template>
  <ul class="sidenav app-sidenav lime lighten-2" :class="{open: value}">

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
    links: [
      {title: localizeFilter('Total_Bill'), url: '/', exact: true},
      {title: localizeFilter('Employee_Objects'), url: '/planning', },
      {title: localizeFilter('Property'), url: '/categories', },
      {title: localizeFilter('Record_Objects'), url: '/objects', },
      {title: localizeFilter('History_Operation'), url: '/history', },
      {title: localizeFilter('Task'), url: '/task', },
      {title: localizeFilter('Users'), url: '/users', },
    ]
  })
}
</script>
