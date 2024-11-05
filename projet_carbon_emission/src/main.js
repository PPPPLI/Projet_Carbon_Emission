import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import GoogleAuth from 'vue3-google-login';

const app = createApp(App);

app.use(router);
app.use(GoogleAuth, {
    clientId: "369210574185-t28t40io82oobgi1nan1fh2b9qtqivr0.apps.googleusercontent.com",
    scope: 'profile email',
});

app.mount('#app');
