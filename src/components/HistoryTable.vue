<template>
  <table>
      <thead>
      <tr>
        <th>#</th>
        <th>{{'History_TableAmount' | localize}}</th>
        <th>{{'Date' | localize}}</th>
        <th>{{'History_TableCategory' | localize}}</th>
        <th>{{'History_TableType' | localize}}</th>
        <th>{{'History_TableOpen' | localize}}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx+1 }}</td>
        <td>{{ record.amount | currency('RUB') }}</td>
        <td>{{ record.date | date('datetime') }}2</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span 
          :class="[record.typeClass]"
          class="white-text badge"
        >{{ record.typeText }}</span>
        </td>
        <td>
          <button v-tooltip="'Посмотреть запись'" class="btn-small btn blue" @click="$router.push('/detail/' + record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
