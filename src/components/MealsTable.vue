<template>
  <div>
    <div class='wrapper' v-if='products.length'>
      <p>Overview of added products:</p>
      <table>
        <thead>
          <tr>
              <th>Meal</th>
              <th>Calories</th>
              <th>When added</th>
          </tr>
        </thead>

        <tbody :key='index' v-for='(meal, index) in orderedProducts'>
          <tr :class="{'light-row': index % 2 === 0, 'dark-row': index % 2 !== 0 }">
            <TableRow :meal='meal' />
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else>No data available to populate the meals table</p>
  </div>
</template>

<script>
  import TableRow from './TableRow.vue'

  export default {
    name: 'MealsTable',
    props: {
      products: Array,
    },
    components: {
      TableRow
    },
    computed: {
      orderedProducts() {
        this.products.sort((a, b) => b.date.toDate() - a.date.toDate());
        return this.products;
      }
    }
  }
</script>

<style scoped>
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid rgb(175, 175, 175);
  overflow: auto;
}

p {
  text-align: left;
  font-size: 18px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

th {
  font-size: 18px;
  background: rgb(255, 206, 70);
  padding: 10px 0;
}

.light-row {
  background: rgb(255, 255, 255);
}

.dark-row {
  background: rgb(238, 238, 238);
}
</style>