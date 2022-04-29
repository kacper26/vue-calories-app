<template>
  <div>
    <nav>
      <span v-show='!isLoggedIn'>
        <button class='nav-btn'>
          <router-link to='/login'>Login</router-link>
        </button>
        <button class='nav-btn'>
          <router-link to='/register'>Register</router-link>
        </button>
      </span>
      <span v-show='isLoggedIn'>
        <button class='nav-btn'>
          <router-link to='/'>Home</router-link>
        </button>
        <button class='nav-btn'>
          <router-link to='/add-meal'>Add meal</router-link>
        </button>
        <button @click='logout' class='nav-btn'>Logout</button>
      </span>
    </nav>
    <h4 v-if='isLoggedIn'>Current user: {{ loggedUser }}</h4>
  </div>
</template>

<script>
  import { auth } from '../firebaseConfig.js'
  import { signOut } from 'firebase/auth'

  export default {
    name: 'Navbar',
    props: {
      isLoggedIn: Boolean
    },
    data() {
      return {
        loggedUser: String
      }
    },
    methods: {
      logout() {
        signOut(auth)
          .then(() => {
            this.$router.push('/login');
            new Audio('/audio/minimize_006.ogg').play();
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    },
    watch: {
      isLoggedIn() {
        if (this.isLoggedIn) {
          this.loggedUser = auth.currentUser.email;
        } else {
          this.loggedUser = '';
        }
      }
    }
  }
</script>

<style>
nav {
  display: flex;
  width: 100%;
  justify-content: center;
}

h4 {
  text-align: center;
  margin-top: 7px;
}
</style>