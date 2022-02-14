/*
 * @Author: matiastang
 * @Date: 2022-01-04 17:38:54
 * @LastEditors: matiastang
 * @LastEditTime: 2022-02-14 16:54:40
 * @FilePath: /dw-vue-components/shims-vue.d.ts
 * @Description: vue全局类型声明
 */
/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
    export {
        [proppName:String]: any;
    }
}
