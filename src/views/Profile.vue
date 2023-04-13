<template>
    <div>
        <el-descriptions v-if="user != null" border direction="vertical">
            <el-descriptions-item label="用户名">{{ user.username }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ user.email }}</el-descriptions-item>
            <el-descriptions-item label="最后登录时间">{{ user.last_login }}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup>
import axios from '../utils/axios'
import { computed, ref } from 'vue';

const username = computed(() => { return sessionStorage.getItem('username') })
const user = ref(null)
axios.get('user/', { params: username }).then(res => {
    user.value = res.data[0]
    console.log(user.value)
})
</script>

<style lang="scss" scoped></style>