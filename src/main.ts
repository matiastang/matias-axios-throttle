/*
 * @Author: your name
 * @Date: 2021-10-15 17:10:16
 * @LastEditTime: 2022-04-11 14:52:06
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /matias-axios-throttle/src/main.ts
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

// 路由
app.use(router)
// 挂载
app.mount('#app')
console.info(`当前Vue版本为${app.version}`)
