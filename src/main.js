import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'

import {clickOutside, icon, focusDirective} from'./directives.js'
import './assets/styles/main.scss'
import App from './App.vue'

const app = createApp(App)
app.directive('icon', icon)
app.directive('clickclickOutside',clickOutside)
app.directive('focus', focusDirective)
app.use(router)
app.use(store)

app.mount('#app')
