<template>
    <el-scrollbar max-height="90vh">
        <div style="margin-right: 15px;">
            <h1>单项选择</h1>
            <el-table :data="state.singleChoices" style="width: 100%">
                <el-table-column type="index" />
                <el-table-column prop="body" label="题目" />
                <el-table-column width="130">
                    <template #default="scope">
                        <el-popconfirm title="确定要删除吗?" @confirm="deleteConfirm(scope.row)">
                            <template #reference>
                                <el-button type="danger" size="small" text>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <h1>多项选择</h1>
            <el-table :data="state.mutipleChoices" style="width: 100%">
                <el-table-column type="index" />
                <el-table-column prop="body" label="题目" />
                <el-table-column width="130">
                    <template #default="scope">
                        <el-popconfirm title="确定要删除吗?" @confirm="deleteConfirm(scope.row)">
                            <template #reference>
                                <el-button type="danger" size="small" text>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <h1>填空题</h1>
            <el-table :data="state.blanks" style="width: 100%">
                <el-table-column type="index" />
                <el-table-column prop="body" label="题目" />
                <el-table-column width="130">
                    <template #default="scope">
                        <el-popconfirm title="确定要删除吗?" @confirm="deleteConfirm(scope.row)">
                            <template #reference>
                                <el-button type="danger" size="small" text>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <h1>主观题</h1>
            <el-table :data="state.subjectives" style="width: 100%">
                <el-table-column type="index" />
                <el-table-column prop="body" label="题目" />
                <el-table-column width="130">
                    <template #default="scope">
                        <el-popconfirm title="确定要删除吗?" @confirm="deleteConfirm(scope.row)">
                            <template #reference>
                                <el-button type="danger" size="small" text>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-scrollbar>
</template>

<script setup>
import { useRoute } from 'vue-router';
import axios from '../utils/axios';
import { inject, reactive } from 'vue';

const route = useRoute()
const examId = route.params.examId

const state = reactive({
    singleChoices: [],
    mutipleChoices: [],
    blanks: [],
    subjectives: []
})

let questions = []
//获取数据
axios.get('exam-question/', { params: { exam: examId } }).then(res => {
    questions = res.data
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

//删除题目
const reload = inject('reload')
const deleteConfirm = (row) => {
    const url = questions.find((item) => item.question_url === row.url).url
    console.log(url);
    // axios.delete(url, { baseURL: '' }).then(res => {
    //     console.log(res);
    // })
    axios.delete(url, { baseURL: '' }).then(res => {
        console.log(res)
        reload()
    })
}
</script>

<style lang="scss" scoped></style>