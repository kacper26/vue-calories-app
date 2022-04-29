<template>
  <div v-show='showMap' id='map'></div>
</template>

<script>
  import { getMap } from '../helpers.js'
  
  export default {
    name: 'MapComponent',
    props: {
      location
    },
    watch: {
      location() {
        if (this.location) {
          getMap(this.location.latitude, this.location.longitude);
        }
      }
    },
    computed: {
      showMap() {
        return this.location != null;
      }
    }
  }
</script>

<style scoped>
#map {
  height: 400px;
}
</style>