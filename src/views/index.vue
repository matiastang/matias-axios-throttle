<!--
 * @Author: matiastang
 * @Date: 2022-03-31 15:28:39
 * @LastEditors: matiastang
 * @LastEditTime: 2022-04-11 15:10:04
 * @FilePath: /matias-axios-throttle/src/views/index.vue
 * @Description: 框架测试
-->
<template>
    <div>框架测试</div>
    <input v-model="inputText" @change="inputChange" />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const inputText = ref('')
const inputChange = (payload: Event) => {
    console.log(payload)
}
</script>
<style lang="scss" scoped></style>
