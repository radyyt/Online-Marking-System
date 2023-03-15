<template>
    <div class="header">
        <div class="left">
            <span class="page-title">{{ state.pageName }}</span>
        </div>
        <div class="right">
            <el-dropdown @command="event">
                <span class="el-dropdown-link">
                    {{ username }}
                    <el-icon style="margin-left: 5px;">
                        <CaretBottom />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item command="quit" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { pathMap } from '../utils';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue'

const router = useRouter()
const store = useStore()

const username = computed(() => { return store.state.username })
const state = reactive({
    // user_name: '用户',
    pageName: ''
})

router.afterEach((to) => {
    state.pageName = pathMap[to.name]
    console.log('to.name', to.name)
})

//下拉菜单的触发事件
const event = (command) => {
    console.log(command)
    if (command == "quit") {
        localStorage.clear()
        router.push({ path: '/login' })
    }
}

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