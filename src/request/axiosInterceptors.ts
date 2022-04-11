/*
 * @Author: matiastang
 * @Date: 2021-11-16 14:09:39
 * @LastEditors: matiastang
 * @LastEditTime: 2022-04-11 14:54:57
 * @FilePath: /matias-axios-throttle/src/request/axiosInterceptors.ts
 * @Description: axiosInstance | 拦截器
 */
import axios, { AxiosInstance } from 'axios'
import config from './config'
/**
 * axiosInstance
 */
let _instance: AxiosInstance | null = null
/**
 * 初始化拦截器
 */
const initInstance = () => {
    if (_instance) {
        return _instance
    }

    // 自定义实例默认值
    const axiosInstance = axios.create(config)

    // 添加请求拦截器
    axiosInstance.interceptors.request.use(
        (config) => {
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // 添加响应拦截器
    axiosInstance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    _instance = axiosInstance
    return _instance
}

export default initInstance
