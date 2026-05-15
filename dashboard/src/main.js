/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// Composables
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia()
registerPlugins(app)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')
