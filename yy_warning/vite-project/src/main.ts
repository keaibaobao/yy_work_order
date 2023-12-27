import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from "./router/index.ts";
import ElementPlus from 'element-plus'
// import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
import store from './store'
import axios from "axios";
import 'element-plus/dist/index.css'
import './permission.ts'
// svg 相关
import 'virtual:svg-icons-register'
import SvgIcon from './components/SvgIcon/index.vue'
const app=createApp(App)
app.config.globalProperties.$axios = axios
// app.use(axios)
app.use(router)
app.use(ElementPlus);
// app.use(ElementPlus, {locale})
app.use(store)
app.mount('#app')
app.component('svg-icon', SvgIcon)
export default app