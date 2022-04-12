import { AxiosRequestConfig, CancelTokenSource } from 'axios'

/**
 * 重复请求对象
 */
interface RequestRelevance {
    resolve: (value: any) => void
    reject: (reason?: any) => void
}
/**
 * 请求任务对象
 */
interface RequestTask {
    // hash
    hash: string
    // 参数
    options: AxiosRequestConfig
    // 取消请求tokenSource
    tokenSource: CancelTokenSource
    // 是否取消
    isAbort: boolean
    // 重复请求列表
    relevance: RequestRelevance[]
}
/**
 * 请求的task列表
 */
const REQUEST_TASK: RequestTask[] = []

/**
 * 添加task
 * @param {Object} hash
 * @param {Object} options
 * @param {Object} task
 */
function addTask(hash: string, options: AxiosRequestConfig, tokenSource: CancelTokenSource) {
    REQUEST_TASK.push({
        hash,
        options,
        tokenSource,
        isAbort: false,
        relevance: [],
    })
}

/**
 * 查找相同task
 * @param {Object} hash
 * @return {Object} 查找的相同task
 */
function sameTask(hash: string, includeAbort: boolean = false) {
    for (let i = 0; i < REQUEST_TASK.length; i++) {
        const task = REQUEST_TASK[i]
        if (includeAbort) {
            if (task.hash == hash) {
                return task
            }
            continue
        }
        // 只查询未取消的
        if (!task.isAbort && task.hash == hash) {
            return task
        }
    }
    return null
}

/**
 * 移除task
 * @param {Object} hash
 */
function removeTask(hash: string) {
    for (let i = 0; i < REQUEST_TASK.length; i++) {
        const task = REQUEST_TASK[i]
        if (task.hash === hash) {
            REQUEST_TASK.splice(i, 1)
            return
        }
    }
}

/**
 * 查找处理task
 * @param {Object} cb
 */
function dealWithTask(cb: (task: RequestTask) => void) {
    if (REQUEST_TASK.length <= 0) {
        return
    }
    for (let i = 0; i < REQUEST_TASK.length; i++) {
        const task = REQUEST_TASK[i]
        cb(task)
    }
}

/**
 * 取消全部请求
 * @param cancelMessage
 */
const abortAll = (cancelMessage = '取消请求') => {
    dealWithTask((task) => {
        task.tokenSource.cancel(cancelMessage) // 取消请求
        task.isAbort = true
    })
}

/**
 * 取消指定的请求
 * @param urls
 * @param cancelMessage
 * @returns
 */
const abortRequestTasks = (urls: string[], cancelMessage = '取消请求') => {
    if (urls.length <= 0 || REQUEST_TASK.length <= 0) {
        return
    }
    dealWithTask((task) => {
        if (task.options.url && urls.includes(task.options.url)) {
            task.tokenSource.cancel(cancelMessage) // 取消请求
            task.isAbort = true
        }
    })
}

/**
 * 保留指定请求，其他全部移除
 * @param urls
 * @param cancelMessage
 * @returns
 */
const keepRequestTasks = (urls: string[], cancelMessage = '取消请求') => {
    if (urls.length <= 0 || REQUEST_TASK.length <= 0) {
        return
    }
    dealWithTask((task) => {
        if (task.options.url && !urls.includes(task.options.url)) {
            task.tokenSource.cancel(cancelMessage) // 取消请求
            task.isAbort = true
        }
    })
}

/**
 * 获取所有任务
 * @returns
 */
const getAllTask = () => {
    return REQUEST_TASK
}

/**
 * 获取当前请求的所有地址
 * @returns
 */
const getRequestUrls = () => {
    return REQUEST_TASK.map((task) => {
        return task.options.url
    }).filter((url) => url)
}

export {
    addTask,
    sameTask,
    removeTask,
    dealWithTask,
    // removeRequestTask,
    abortAll,
    abortRequestTasks,
    keepRequestTasks,
    getAllTask,
    getRequestUrls,
}
