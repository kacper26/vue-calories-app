<template>
  <div class='home'>
    <MealsTable :products='products' />
    <MealsStats :products='products' />
  </div>
</template>

<script>
  import MealsTable from '../components/MealsTable.vue'
  import MealsStats from '../components/MealsStats.vue'

  export default {
    name: 'HomeView',
    components: {
      MealsTable,
      MealsStats
    },
    props: {
      products: Array
    }
  }
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 100%;
}
</style>