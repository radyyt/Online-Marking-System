<template>
    <div class="header">
        <div class="left">
            <span class="page-title">{{ state.page_name }}</span>
        </div>
        <div class="right">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{state.user_name}}
                    <el-icon style="margin-left: 7px;">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { pathMap } from '../utils'
import { useRouter } from 'vue-router'
import { reactive } from 'vue';

const state = reactive({
    user_name: '用户',
    page_name: ''
})

const router = useRouter()
router.afterEach((to) => {
    state.page_name = pathMap[to.name]
    console.log('to.name', to.name)

})

</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    align-items: center;
    /* border-bottom: 1px solid #4C4D4F; */
}

.right {
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-dropdown-link {
    cursor: pointer;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-dropdown-link:focus {
    /* 用于覆盖浏览器的用户代理样式表 */
    outline: none;
}

.page-title {
    font-weight: bold;
    font-size: 23px;
    letter-spacing: 1px;
}
</style>