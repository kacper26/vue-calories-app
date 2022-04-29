<template>
  <div style='width:100%'>
    <form @submit.prevent='register'>
      <div class='form-view'>
        <div class='flex-row'>
          <h2>Register</h2>
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
          <label for='passwordRepeat'>Repeat Password</label>
          <input
            type='password'
            placeholder='Repeat Password'
            id='passwordRepeat'
            v-model='passwordRepeat'
            required
          >
        </div>

        <div class='flex-row'>
          <button type='submit' class='btn'>Register</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { auth } from '../firebaseConfig.js'
  import { createUserWithEmailAndPassword } from 'firebase/auth';

  export default {
    name: 'RegisterView',
    data() {
      return {
        email: '',
        password: '',
        passwordRepeat: '',
      };
    },
    methods: {
      register() {
        if (this.password !== this.passwordRepeat) {
          alert('Please type the same password twice');
        } else {
          createUserWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
              this.$router.push('/');
            })
            .catch(error => {
              alert(error.message);
            });
        }
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
  background: rgb(228, 15, 0);
}
</style>