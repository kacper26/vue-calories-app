<template>
  <div class='wrapper'>
    <h3>Statistics for current day:</h3>
    <div class='wrapper nested-wrapper'>
      <p :class='{"pig-mode": !caloriesLeft}'>Calories eaten: {{ caloriesEaten }} kcal</p>
      <p>Daily limit: {{ dailyLimit }} kcal</p>
      <p>Left today: {{ caloriesLeft }} kcal</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MealsStats',
    data() {
      return {
        dailyLimit: 2000
      }
    },
    props: {
      products: Array,
    },
    computed: {
      caloriesLeft() {
        let current = this.dailyLimit - this.caloriesEaten;
        return current >= 0 ? current : 0;
      },
      caloriesEaten() {
        let today = new Date();
        let caloriesEatenToday = 0;

        this.products.forEach(product => {
          let productDay = product.date.toDate();
          if (today.toDateString() === productDay.toDateString()) {
            caloriesEatenToday += product.calories;
          }
        });

        return caloriesEatenToday;
      }
    }
  }
</script>

<style scoped>
h3, p {
  text-align: center;
  font-size: 18px;
}

.pig-mode {
  color: rgb(224, 0, 0);
}

.wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.nested-wrapper {
  row-gap: 0px;
}
</style>