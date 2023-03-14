<template>
    <el-table :data="state.info" :table-layout="fixed">
        <el-table-column prop="body" label="题目">
            <template #default="scope">
                <span class="one-line">{{ scope.row.body }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="subject" label="学科" width="100" :filters="[
            { text: '数学', value: '数学' },
            { text: '语文', value: '语文' },
        ]" :filter-method="filterTag" filter-placement="bottom-end">
            <template #default="scope">
                <el-tag>{{ scope.row.subject }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="详情" width="100">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="goto(scope.$index)">
                    查看
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import axios from '../utils/axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const state = reactive({
    info: []
})

axios.get('singleChoice/').then((res) => {
    console.log(res)
    state.info = res.data
})

//跳转事件
const goto = (index) => {
    console.log(index)
    // router.push({ path: '/' })
}

//学科标签过滤
const filterTag = (value, row) => {
    return row.subject === value
}
</script>

<style scoped>
.one-line{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>