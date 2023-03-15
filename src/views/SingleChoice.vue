<template>
    <el-table :data="state.info">
        <el-table-column type="selection" width="35" />
        <el-table-column type="expand">
            <template #default="props">
                <div class="expand-block">
                    <h4 class="title">题目详情：</h4>
                    <div class="question-zone">
                        <p style="margin: 0px;"> {{ props.row.body }}</p>
                        <div id="choices-zone">
                            <span class="choices">A:&nbsp&nbsp&nbsp&nbsp{{ props.row.choices_1 }}</span>
                            <span class="choices">B:&nbsp&nbsp&nbsp&nbsp{{ props.row.choices_2 }}</span>
                            <span class="choices">C:&nbsp&nbsp&nbsp&nbsp{{ props.row.choices_3 }}</span>
                            <span class="choices">D:&nbsp&nbsp&nbsp&nbsp{{ props.row.choices_4 }}</span>
                        </div>
                    </div>
                    <h4 class="title">正确答案：{{ props.row.right_answer }}</h4>

                </div>
            </template>
        </el-table-column>

        <el-table-column prop="body" label="题目">
            <template #default="scope">
                <span class="one-line">{{ scope.row.body }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="subject" label="学科" width="100" :filters="[
            { text: '数学', value: '数学' },
            { text: '语文', value: '语文' },
            { text: '政治', value: '政治' }
        ]" :filter-method="filterTag" filter-placement="bottom-end">
            <template #default="scope">
                <el-tag>{{ scope.row.subject }}</el-tag>
            </template>
        </el-table-column>
        <!-- <el-table-column label="详情" width="100">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="goto(scope.$index)">
                    查看
                </el-button>
            </template>
        </el-table-column> -->
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
    console.log(state.info)
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
.one-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.expand-block {
    margin: 10px;
}

.question-zone {
    background-color: #F0F2F5;
    overflow-wrap: break-word;
    padding: 7px 15px;
    margin: 0px;
    border-radius: 4px;
    margin-bottom: 10px;
}

.title {
    margin-top: 0px;
    margin-bottom: 5px;
}

#choices-zone {
    margin-top: 15px;
    padding: 0px 15px;
    display: grid;
}

.choices {
    margin: 3px;
}
</style>