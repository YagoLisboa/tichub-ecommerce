import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import router from './router';
import './assets/main.css';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);      // Registra o Pinia primeiro
app.use(router);     // Depois o router
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.mount('#app');
