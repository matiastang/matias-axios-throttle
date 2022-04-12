/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:55:21
 * @LastEditors: matiastang
 * @LastEditTime: 2022-04-12 19:01:27
 * @FilePath: /matias-axios-throttle/src/throttle/throttle.ts
 * @Description: 节流请求
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getObjectHash } from './util'
import { addTask, sameTask, removeTask } from './task'

/**
 * 节流请求
 * @param httpAxios axios实例,将用该实例发起请求
 * @param options 请求配置，类型同axios
 * @returns promise
 */
const requestThrottle = <T = any, R = AxiosResponse<T>, D = any>(
    httpAxios: AxiosInstance,
    config: AxiosRequestConfig<D>
): Promise<R> => {
    const requestHash = getObjectHash({
        data: config.data,
        params: config.params,
        baseURL: config.baseURL,
        url: config.url,
        method: config.method,
    })
    return new Promise((resolve: (value: R) => void, reject: (reason?: any) => void) => {
        const task = sameTask(requestHash)
        if (task) {
            // 重复请求
            // 添加回调
            task.relevance.push({
                resolve,
                reject,
            })
            return
        }
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        addTask(requestHash, config, source)
        httpAxios
            .request<T, R, D>({
                ...config,
                cancelToken: source.token,
            })
            .then((res) => {
                _sendSuccess<T, R>(requestHash, res)
                resolve(res)
            })
            .catch((err) => {
                _sendFail(requestHash, err)
                reject(err)
            })
    })
}

/**
 * 请求成功处理
 * @param hash
 * @param res
 * @returns
 */
function _sendSuccess<T, R = AxiosResponse<T>>(hash: string, res: R) {
    const task = sameTask(hash, true)
    if (task === null) {
        console.warn(`success未找到${hash}`)
        return
    }
    for (const relevance of task.relevance) {
        // 触发成功回调
        relevance.resolve(res)
    }
    removeTask(hash)
}

/**
 * 请求失败处理
 * @param hash
 * @param err
 * @returns
 */
function _sendFail(hash: string, err: any) {
    const task = sameTask(hash, true)
    if (task === null) {
        console.warn(`error未找到${hash}`)
        return
    }
    for (const relevance of task.relevance) {
        // 触发失败回调
        relevance.reject(err)
    }
    removeTask(hash)
}

export { requestThrottle }
