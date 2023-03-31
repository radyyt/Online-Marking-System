<template>
    <div>
        <el-table :data="state.info" border stripe>
            <el-table-column type="index" width="50" />
            <el-table-column prop="title" label="名称" />
            <el-table-column prop="subject_name" label="科目" />
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <el-button link size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    <el-button link size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
</script>

<style lang="scss" scoped></style>