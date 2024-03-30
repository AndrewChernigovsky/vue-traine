<<<<<<< HEAD
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import components from '@/components/UI';

const app = createApp(App);

components.forEach(component => {
	app.component(component.name, component)
})

app.mount('#app')
=======
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
>>>>>>> bb4a92553296f2943235d1ceb31d5fa5dd87ebf7
