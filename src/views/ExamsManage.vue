<template>
    <div>
        <el-row class="header" :gutter="20">
            <el-col>
                <el-button type="primary" @click="addExam">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <span>添加试卷</span>
                </el-button>
            </el-col>
        </el-row>
        <el-space warp size="default">
            <el-card class="box-card" v-for="item in state.info" :key="item.id">
                <template #header>
                    <div class="card-header">
                        <span>{{ item.title }}</span>
                        <el-button-group>
                            <el-button type="info" size="default" @click=""><el-icon>
                                    <EditPen />
                                </el-icon></el-button>
                            <el-button type="info" size="default" @click=""><el-icon>
                                    <Share />
                                </el-icon></el-button>
                            <el-button type="info" size="default" @click=""><el-icon>
                                    <Delete />
                                </el-icon></el-button>
                        </el-button-group>
                    </div>
                </template>
                <div class="text item">科目：{{ item.subject_name }}</div>
                <div class="text item">创建者：{{ item.author.username }}</div>
                <div class="text item">创建时间：{{ item.create_time }}</div>
                <div class="text item">修改时间：{{ item.update_time }}</div>
                <div class="text item">描述：{{ item.desc }}</div>
            </el-card>
        </el-space>
    </div>
</template>

<script setup>
import axios from '../utils/axios'
import { reactive } from 'vue';

const state = reactive({
    info: [],
})
//从后端获取试卷信息
axios.get('exam/').then((res) => {
    state.info = res.data
    console.log(state.info);
})

const addExam = () => {
    console.log('addExam')
}
</script>

<style lang="scss" scoped>
.header {
    margin-bottom: 30px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 400px;
}
</style>