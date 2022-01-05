/*
 * @Author: your name
 * @Date: 2021-10-15 17:10:16
 * @LastEditTime: 2022-01-05 11:05:04
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /dw-vue-components/src/main.ts
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { store, key } from '@/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
// 自定义组件
// import DwVueComponents from 'datumwealth-vue-components'

const app = createApp(App)

// 导入西筹组件
// app.use(DwVueComponents)

// Element-plus组件
app.use(ElementPlus, {
    locale: zhCn,
})
// 状态
app.use(store, key)
// 路由
app.use(router)
// axios
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios) // provide 'axios'
// 挂载
app.mount('#app')
if (import.meta.env.PROD) {
    console.log = () => {
        // 线上环境屏蔽log
    }
}
console.info(`当前Vue版本为${app.version}`)
