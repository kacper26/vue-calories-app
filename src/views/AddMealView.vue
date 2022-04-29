<template>
  <div class='container'>
    <form class='form-view' ref='addMealForm' @submit.prevent='addMeal'>
      <div class='flex-row'>
        <label for='meal-name'>Meal name</label>
        <input id='meal-name' type='text' v-model='mealName' placeholder='Meal name' required/>
      </div>
      <div class='flex-row'>
        <label for='calories'>Calories</label>
        <input id='calories' type='number' v-model='calories' placeholder='Calories' min='0' required/>
      </div>
      <div class='flex-row'>
        <label for='location'>Location</label>
        <div>
          <input id='location' type='text' :value='locationString' placeholder='Location' readonly/>
          <button @click='retrieveCoordinates' class='btn gps-btn' type='button'>GPS</button>
        </div>
      </div>
      <div class='flex-row'>
        <button type='submit' class='btn'>Add meal</button>
      </div>
    </form>

    <MapComponent :location='location' />
    
  </div>
</template>
  
<script>
  import { getCurrentPosition, vibrateSos } from '../helpers.js'
  import { db } from '../firebaseConfig.js'
  import { collection, addDoc, GeoPoint, Timestamp } from 'firebase/firestore'
  import MapComponent from '../components/MapComponent.vue'

  export default {
    name: 'AddMeal',
    data() {
      return {
        mealName: '',
        calories: null,
        location: null,
      }
    },
    methods: {
      addMeal() {
        vibrateSos();

        addDoc(collection(db, 'products'), {
          name: this.mealName.toLowerCase(),
          calories: this.calories,
          location: this.location,
          date: Timestamp.fromDate(new Date())
        })
        .then(response => {
          this.$emit('refresh-products');

          this.mealName = '';
          this.calories = null;
          this.location = null;

          this.$refs.addMealForm.reset();
          console.log(`Product with id "${response.id}" was inserted`);
        })
        .catch(error => {
          alert(error.message);
        })
      },
      retrieveCoordinates() {
        if ('geolocation' in navigator) {
          getCurrentPosition()
            .then((position) => {
              this.location = new GeoPoint(position.coords.latitude, position.coords.longitude);
            })
            .catch(error => {
              console.log(error.message);
            });
        } else {
          console.log('geolocation is not available');
        }
      }
    },
    components: {
      MapComponent
    },
    computed: {
      locationString() {
          return this.location != null
            ? `${this.location.latitude}, ${this.location.longitude}`
            : '';
      }
    }
  }
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 10px;
}

.form-view {
  display: flex;
  flex-direction: column;
  justify-items: center;
}

.flex-row {
  display: flex;
  flex-direction: column;
  margin: 5px 0;
}

.flex-row input {
  padding: 5px;
  font-size: 15px;
}

.flex-row button {
  padding: 10px;
  margin-top: 10px;
}

.gps-btn {
  padding: 5px 30px !important;
  margin: 0 !important;
  font-size: 20px;
}

.flex-row div {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flex-row div > input {
  width: 100%;
  margin-right: 5px;
}
</style>