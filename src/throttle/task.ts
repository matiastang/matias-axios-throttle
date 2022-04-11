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
 * 移除请求
 * @param {Object} judgeBack
 * @param {Object} cb
 */
// function removeRequestTask(judgeBack, cb) {
//     let indexs = []
//     if (REQUEST_TASK.length <= 0) {
//         return
//     }
//     for (let i = 0; i < REQUEST_TASK.length; i++) {
//         let task = REQUEST_TASK[i]
//         if (judgeBack(task)) {
//             indexs.push(i)
//         }
//     }
//     for (let i = indexs.length - 1; i >= 0; i--) {
//         let task = REQUEST_TASK[i]
//         cb(task)
//         REQUEST_TASK.splice(i, 1)
//     }
// }

/**
 * 取消全部请求
 */
const abortAll = () => {
    dealWithTask((task) => {
        task.tokenSource.cancel('abortAll取消请求') // 取消请求
        task.isAbort = true
    })
}

/**
 * 取消指定的请求
 */
const abortRequestTasks = (urls: string[]) => {
    if (urls.length <= 0 || REQUEST_TASK.length <= 0) {
        return
    }
    dealWithTask((task) => {
        if (task.options.url && urls.includes(task.options.url)) {
            task.tokenSource.cancel('abortAll取消请求') // 取消请求
            task.isAbort = true
        }
    })
}

/**
 * 保留指定请求，其他全部移除
 */
const keepRequestTasks = (urls: string[]) => {
    if (urls.length <= 0 || REQUEST_TASK.length <= 0) {
        return
    }
    dealWithTask((task) => {
        if (task.options.url && !urls.includes(task.options.url)) {
            task.tokenSource.cancel('abortAll取消请求') // 取消请求
            task.isAbort = true
        }
    })
}

const getAllTask = () => {
    return REQUEST_TASK
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
}
