import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './styles/index.less'
import "tailwindcss/tailwind.css"
import components from './components'

const app = createApp(App)
    app 
    .use(store)
    .use(router)
    .use(ElementPlus, {locale: zhCn})
    .use(components)
    .mount('#app')
