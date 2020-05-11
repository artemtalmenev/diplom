<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">

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
      {title: localizeFilter('History_Operation'), url: '/history', },
      {title: localizeFilter('Employee_Objects'), url: '/planning', },
      {title: localizeFilter('Menu_NewRecord'), url: '/record', },
      {title: localizeFilter('Property'), url: '/categories', },
      {title: localizeFilter('Task'), url: '/task', },
      {title: localizeFilter('Objects'), url: '/objects', },
    ]
  })
}
</script>
