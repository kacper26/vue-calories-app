<template :meal='meal'>
  <td>{{ mealName }}</td>
  <!-- <td>{{ meal.location }}</td> -->
  <td>{{ calories }}</td>
  <td>{{ addedDate }}</td>
</template>

<script>
  export default {
    name: 'TableRow',
    date() {
      return {
        mealName: '',
        calories: '',
        addedDate: ''
      }
    },
    props: {
      meal: Object
    },
    created() {
      this.mealName = this.meal.name;
      this.calories = this.meal.calories;
      this.addedDate = this.meal.date.toDate().toLocaleString('en-uk');
    }
  }
</script>