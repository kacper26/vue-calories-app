<template>
  <div style='width:100%'>
    <form @submit.prevent='login'>
      <div class='form-view'>
        <div class='flex-row'>
          <h2>Login</h2>
        </div>

        <div class='flex-row'>
          <label for='email'>Email</label>
          <input
            type='email'
            placeholder='Email address'
            id='email'
            v-model='email'
            required
          >
        </div>

        <div class='flex-row'>
          <label for='password'>Password</label>
          <input
            type='password'
            placeholder='Password'
            id='password'
            v-model='password'
            required
          >
        </div>

        <div class='flex-row'>
          <button type='submit' class='btn'>Login</button>
        </div>
      </div>
    </form>

    <div class='flex-row'>
      <button @click='loginWithGoogle' class='btn'>Login with Google</button>
    </div>
  </div>
</template>

<script>
  import { auth, googleProvider } from '../firebaseConfig.js'
  import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

  export default {
    name: 'LoginView',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      login() {
        if (auth.currentUser) {
          alert('User is already logged in!');
          return;
        }

        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            this.$router.push('/');
          })
          .catch((error) => {
            alert(error.message);
          });
      },
      loginWithGoogle() {
        if (auth.currentUser) {
          alert('User is already logged in!');
          return;
        }

        signInWithPopup(auth, googleProvider)
          .then((result) => {
            this.$router.push('/');
          }).catch((error) => {
            alert(error.message);
          });
      }
    }
  }
</script>

<style scoped>
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
</style>