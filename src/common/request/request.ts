/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:55:21
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-03 10:40:45
 * @FilePath: /datumwealth-openalpha-front/src/common/request/request.ts
 * @Description: axios简单封装
 */
import axios, { AxiosRequestConfig } from 'axios'
import initInstance from '@/common/request/axiosInterceptors'
// import { requestDebounce } from './requestDebounce.js'
import requestThrottle from './requestThrottle'
/**
 * 失败返回类型
 */
export interface RejectType {
    code?: number
    msg: string
}

const http = {
    /**
     * 请求
     * @param options
     * @returns
     */
    request<T>(options: AxiosRequestConfig) {
        const httpAxios = initInstance()
        const requestConfig = {
            ...options,
        }
        /**
         * 成功返回类型
         */
        interface ResolveType {
            code: number
            data: T
            msg: string
        }
        return new Promise<ResolveType>((resolve, reject: (reason: RejectType) => void) => {
            // httpAxios
            //     .request(requestConfig)
            requestThrottle(httpAxios, requestConfig)
                .then((response) => {
                    const status = response.status
                    if (status !== 200) {
                        reject({
                            msg: `错误码${status}`,
                        })
                        return
                    }
                    if (response && response.data) {
                        const { code, msg } = response.data
                        if (code === 200) {
                            resolve(response.data)
                            return
                        }
                        reject({
                            code,
                            msg,
                        })
                        return
                    }
                    reject({
                        msg: '返回数据异常',
                    })
                })
                .catch((err) => {
                    const errMessage = err.msg
                    if (typeof errMessage === 'string' && errMessage.endsWith('timeout')) {
                        reject({
                            msg: '请求超时',
                        })
                        return
                    }
                    // if (typeof errMessage === 'string' && errMessage.endsWith('abort')) {
                    //     reject({
                    //         msg: '取消请求',
                    //     })
                    //     return
                    // }
                    if (axios.isCancel(err)) {
                        reject({
                            msg: '取消请求',
                        })
                        return
                    }
                    reject({
                        msg: errMessage,
                    })
                })
        })
    },
    /**
     * get请求
     * @param url
     * @param options
     * @returns
     */
    get<T>(url: string, params: object = {}, options: AxiosRequestConfig = {}) {
        options.url = url
        options.params = params
        options.method = 'GET'
        return new Promise<T>((resolve, reject) => {
            this.request<T>(options)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(reject)
        })
    },
    /**
     * post请求
     * @param url
     * @param data
     * @param options
     * @returns
     */
    post<T>(url: string, data: object, options: AxiosRequestConfig = {}) {
        options.url = url
        options.data = data
        options.method = 'POST'
        return new Promise<T>((resolve, reject) => {
            this.request<T>(options)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(reject)
        })
    },
    /**
     * put请求
     * @param url
     * @param data
     * @param options
     * @returns
     */
    put<T>(url: string, data: object, options: AxiosRequestConfig = {}) {
        options.url = url
        options.data = data
        options.method = 'PUT'
        return new Promise<T>((resolve, reject) => {
            this.request<T>(options)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(reject)
        })
    },
    /**
     * delete请求
     * @param url
     * @param data
     * @param options
     * @returns
     */
    delete<T>(url: string, data: object, options: AxiosRequestConfig = {}) {
        options.url = url
        options.data = data
        options.method = 'DELETE'
        return new Promise<T>((resolve, reject) => {
            this.request<T>(options)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(reject)
        })
    },
    /**
     * 下载
     * @param options
     */
    download(fileName: string, options: AxiosRequestConfig, isResolve: boolean) {
        const httpAxios = initInstance()
        if (options.responseType !== 'blob') {
            options.responseType = 'blob' // 1.首先设置responseType对象格式为 blob:二进制流
        }
        const requestConfig = {
            ...options,
        }
        return new Promise<BlobPart | void | string | unknown>(
            (resolve, reject: (reason: RejectType) => void) => {
                httpAxios
                    .request(requestConfig)
                    .then((response) => {
                        const status = response.status
                        if (status !== 200) {
                            reject({
                                msg: `错误码${status}`,
                            })
                            return
                        }
                        if (response && response.data) {
                            if (isResolve) {
                                resolve(response.data as unknown)
                            } else {
                                // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
                                const blob = new Blob([response.data], {
                                    type: 'application/vnd.ms-excel;charset=utf-8',
                                })
                                // 3.创建一个临时的url指向blob对象
                                const url = window.URL.createObjectURL(blob)
                                // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
                                const a = document.createElement('a')
                                a.href = url
                                a.download = `${fileName}.xlsx`
                                a.click()
                                // 5.释放这个临时的对象url
                                window.URL.revokeObjectURL(url)
                                resolve('成功')
                                return
                            }
                        }
                        reject({
                            msg: '返回数据异常',
                        })
                    })
                    .catch((err) => {
                        const errMessage = err.msg
                        if (typeof errMessage === 'string' && errMessage.endsWith('timeout')) {
                            reject({
                                msg: '请求超时',
                            })
                            return
                        }
                        if (typeof errMessage === 'string' && errMessage.endsWith('abort')) {
                            reject({
                                msg: '取消请求',
                            })
                            return
                        }
                        reject({
                            msg: errMessage,
                        })
                    })
            }
        )
    },
    /**
     * 测试接口请求
     * @param options
     * @returns
     */
    toolRequest(options: AxiosRequestConfig) {
        const httpAxios = initInstance()
        const requestConfig = {
            ...options,
        }
        return new Promise<string>((resolve, reject: (reason: RejectType) => void) => {
            httpAxios
                .request(requestConfig)
                .then((response) => {
                    const status = response.status
                    if (status !== 200) {
                        reject({
                            msg: `错误码${status}`,
                        })
                        return
                    }
                    if (response) {
                        resolve(response.data)
                        return
                    }
                    reject({
                        msg: '返回数据异常',
                    })
                })
                .catch((err) => {
                    const errMessage = err.msg
                    if (typeof errMessage === 'string' && errMessage.endsWith('timeout')) {
                        reject({
                            msg: '请求超时',
                        })
                        return
                    }
                    if (typeof errMessage === 'string' && errMessage.endsWith('abort')) {
                        reject({
                            msg: '取消请求',
                        })
                        return
                    }
                    reject({
                        msg: errMessage,
                    })
                })
        })
    },
}

export default http
