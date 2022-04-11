/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:41:42
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 19:07:53
 * @FilePath: /datumwealth-openalpha-front/src/common/request/config.ts
 * @Description: 配置
 */
import { AxiosRequestConfig } from 'axios'
const baseURL = import.meta.env.VITE_APP_BASE_API
const config: AxiosRequestConfig = {
    baseURL,
    timeout: 10000,
}

export default config
export { baseURL }
