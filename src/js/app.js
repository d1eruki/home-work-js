import { createApp } from 'vue';

const App = {
    data() {
        return {
            counter: 0
        }
    }
}

const app = createApp(App);
app.mount('#app');
