<!--
 * @Author: matiastang
 * @Date: 2022-03-31 15:28:39
 * @LastEditors: matiastang
 * @LastEditTime: 2022-04-12 18:09:46
 * @FilePath: /matias-axios-throttle/src/views/index.vue
 * @Description: 框架测试
-->
<template>
    <div @click="getPictureUrl">点击请求测试，将同时发起两个相同请求，但只会发起一次真正请求</div>
</template>
<script setup lang="ts">
import { getConceptionPicture } from '@/request'

const getPictureUrl = async () => {
    getConceptionPicture('wxf945c220c6b844d7')
        .then((res) => {
            console.log('请求1成功', res)
        })
        .catch((err) => {
            console.log('请求1失败', err)
        })
        .finally(() => {
            console.log('请求1完成')
        })
    getConceptionPicture('wxf945c220c6b844d7')
        .then((res) => {
            console.log('请求2成功', res)
        })
        .catch((err) => {
            console.log('请求2失败', err)
        })
        .finally(() => {
            console.log('请求2完成')
        })
}
</script>
<style lang="scss" scoped></style>
