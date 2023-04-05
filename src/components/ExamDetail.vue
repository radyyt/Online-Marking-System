<template>
    <div>
        <h1>单项选择</h1>
        <el-table :data="state.singleChoices" style="width: 100%">
            <el-table-column type="index" />
            <el-table-column prop="body" label="题目" />
        </el-table>
        <h1>多项选择</h1>
        <el-table :data="state.mutipleChoices" style="width: 100%">
            <el-table-column type="index" />
            <el-table-column prop="body" label="题目" />
        </el-table>
        <h1>填空题</h1>
        <el-table :data="state.blanks" style="width: 100%">
            <el-table-column type="index" />
            <el-table-column prop="body" label="题目" />
        </el-table>
        <h1>多项选择</h1>
        <el-table :data="state.subjectives" style="width: 100%">
            <el-table-column type="index" />
            <el-table-column prop="body" label="题目" />
        </el-table>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import axios from '../utils/axios';
import { reactive } from 'vue';

const route = useRoute()
const state = reactive({
    singleChoices: [],
    mutipleChoices: [],
    blanks: [],
    subjectives: []
})
//获取数据
axios.get('exam-question/', { params: { exam: route.params.examId } }).then(res => {
    const questions = res.data
    for (const item of questions) {
        axios.get(item.question_url, { baseURL: '' }).then(res => {
            const data = res.data
            if (data.type_name == '单项选择') {
                state.singleChoices.push(data)
            } else if (data.type_name == '多项选择') {
                state.mutipleChoices.push(data)
            } else if (data.type_name == '填空题') {
                state.blanks.push(data)
            } else {
                state.subjectives.push(data)
            }
        })
    }
})
</script>

<style lang="scss" scoped></style>