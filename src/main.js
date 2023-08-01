import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import {clickOutside, icon, focusDirective} from'./directives.js'
import './assets/styles/main.scss'
import App from './App.vue'

const app = createApp(App)
app.directive('icon', icon)
app.directive('clickOutside',clickOutside)
app.directive('focus', focusDirective)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(setupCalendar, {})
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

app.mount('#app')
