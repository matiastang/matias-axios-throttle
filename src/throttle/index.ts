/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:55:21
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 19:04:50
 * @FilePath: /datumwealth-openalpha-front/src/common/request/requestThrottle.ts
 * @Description:
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getObjectHash } from './util'
import { addTask, sameTask, removeTask } from './task'

/**
 * 发送请求
 * @param {Object} options 可以包含uni.request中的所有非Funciton的参数
 */
function requestThrottle(httpAxios: AxiosInstance, options: AxiosRequestConfig) {
    const requestHash = getObjectHash({
        data: options.data,
        params: options.params,
        baseURL: options.baseURL,
        url: options.url,
        method: options.method,
    })
    return new Promise(
        (resolve: (value: AxiosResponse<any, any>) => void, reject: (reason?: any) => void) => {
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
            addTask(requestHash, options, source)
            httpAxios
                .request({
                    ...options,
                    cancelToken: source.token,
                })
                .then((res) => {
                    _sendSuccess(requestHash, res)
                    resolve(res)
                })
                .catch((err) => {
                    _sendFail(requestHash, err)
                    reject(err)
                })
        }
    )
}

/**
 * 请求成功处理
 * @param {Object} hash
 * @param {Object} res
 */
function _sendSuccess(hash: string, res: AxiosResponse<any, any>) {
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
 * @param {Object} hash
 * @param {Object} err
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

export default requestThrottle
