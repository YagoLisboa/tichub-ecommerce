import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import './assets/main.css'; // Importa o Tailwind e estilos globais

const app = createApp(App);

// Configuração do PrimeVue com o tema Aura
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app');
