<!--
 * @Author: matiastang
 * @Date: 2021-12-13 10:12:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-04-11 15:25:05
 * @FilePath: /matias-axios-throttle/README.md
 * @Description: datumwealth-vue-components
-->
# matias-axios-throttle

## 说明

该项目为`axios`状态库的本地持久化项目。

## 安装与使用

1. 安装matias-pinia-persisted-state

* `pnpm`导入
> $ pnpm add -D matias-pinia-persisted-state
* `yarn`导入
> $ yarn add -D matias-pinia-persisted-state
* `npm`导入
> $ npm install -D matias-pinia-persisted-state

2. 引用

```ts
// main.ts
import { createPersistedState, PERSISTED_STATE_KEY } from '@/pinia/piniaPersistedState'

// pinia
const pinia = createPinia()
pinia.use(
    createPersistedState({
        key: 'pinia-state',
    })
)

app.use(pinia)

```
* `PERSISTED_STATE_KEY`为本地持久化的`key`.默认是`pinia-state`可以在`createPersistedState`方法中传递自定义的`key`。

2. 使用

`state`类型这种**必须**要包含`stateName`字段，用于命名本地缓存的`key`。

```ts
import { defineStore } from 'pinia'

interface State {
    stateName: string
}

export const useTestStore = defineStore('pinia/test', {
    state: (): State => ({
        stateName: 'test',
    }),
})
```

## 版本

### 0.1.7

1. `state`没有`stateName`属性添加提示。

### 0.1.6

* 开启代码压缩

### 0.1.5

* 目录结构调整

### 0.1.4

* 更新类型文件导出

### 0.1.3

* 更新`package.json`的导出目录

### 0.1.2

* 更新目录结构及名称

### 0.1.1

* 添加类型声明文件

### 0.1.0

* 实现基本的本地持久化功能