import { createApp, h } from 'vue'
import { router } from './router'
import App from './App.vue'
import TestPlugin from './devtools-plugin'

const app = createApp(App)
app.use(TestPlugin)
app.use(router)
app.mount('#app')

createApp({
  render: () => h('h1', {}, 'App 2')
}).mount('#app2')
