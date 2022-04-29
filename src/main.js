import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { auth } from './firebaseConfig'

let app;

auth.onAuthStateChanged(user => {
  if (!app) {
    app = createApp(App).use(router).mount('#app');
  }
});