<template>
  <div>
     <div class="page-title">
    <h3>{{'Task' | localize}}</h3>
  </div>
  </div>
  
</template>
<script>
import TableTask from '@/components/TableTask'
export default {
  name: 'task',
  components: {
    TableTask
  }
}
</script>
