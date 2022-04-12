<!--
 * @Author: matiastang
 * @Date: 2021-12-13 10:12:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-04-12 19:11:35
 * @FilePath: /matias-axios-throttle/README.md
 * @Description: datumwealth-vue-components
-->
# matias-axios-throttle

## 说明

该项目为基于`axios`的一个接口节流功能，当调用一个请求后，在该请求未返回时再次调用了相同接口，如果参数相同则将复用上一个请求的结果，但两个调用接口的回调都将收到请求的结果。一个常见的应用常见是，不同组件里面封装调用了相同接口，组件又在同一个页面中渲染。

## 安装与使用

1. 安装matias-axios-throttle

* `pnpm`导入
> $ pnpm add -D matias-axios-throttle
* `yarn`导入
> $ yarn add -D matias-axios-throttle
* `npm`导入
> $ npm install -D matias-axios-throttle

2. 使用
* 仅需要用`requestThrottle`替换掉最后发起请求的方法。
```ts
import {
    requestThrottle,
    abortAll,
    abortRequestTasks,
    keepRequestTasks,
    getRequestUrls,
} from '../throttle/index'

/**
 * 节流请求
 * @param httpAxios axios实例,将用该实例发起请求
 * @param options 请求配置，类型同axios
 * @returns promise
 */
requestThrottle(httpAxios, requestConfig)
    .then((response) => {
        console.log('请求成功')
    })
    .catch((err) => {
        console.log('请求失败')
    })

```
1. 使用`requestThrottle`发起请求
2. 开放几个操作任务的方法：
   
* `abortAll`取消全部请求
* `getRequestUrls`获取当前请求的所有地址
* `abortRequestTasks`取消指定的请求
* `keepRequestTasks`保留指定请求，其他全部移除
  
**注意**`abortRequestTasks`和`keepRequestTasks`的参数都是`url`

**注意**两次相同`requestThrottle`返回的的结果顺序和调用顺序是相反的。

## 版本

### 0.1.1

* 更新说明文档

### 0.1.0

* 实现基本功能