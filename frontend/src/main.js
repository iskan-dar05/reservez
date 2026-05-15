import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router/router.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import 'swiper/swiper-bundle.css';
import {createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
createApp(App)
.use(Notifications)
.use(pinia)
.component('VueDatePicker', VueDatePicker)
.use(router)
.mount('#app')
