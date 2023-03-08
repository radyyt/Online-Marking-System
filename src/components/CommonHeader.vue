<template>
    <div class="common-header">
        <div class="left">
            <span>{{state.name}}</span>
        </div>
        <div class="Right">
            <el-dropdown>
                <span class="el-dropdown-link">
                    User Name
                    <el-icon>
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
import {pathMap} from '../utils'
import {useRouter} from 'vue-router'
import { reactive } from 'vue';

const state = reactive({
    name: ''
})

const router = useRouter()
router.afterEach((to)=>{
    state.name = pathMap[to.name]
    console.log('to.name',to.name)

})

</script>

<style scoped>
.common-header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    align-items: center;
    border-bottom: 1px solid #4C4D4F;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.el-dropdown-link:focus{
    /* 用于覆盖浏览器的用户代理样式表 */
    outline: none;
}
</style>