<template>
    <div class="container">
        <div class="left">
            <h3 style="margin-top: 0;">待选择</h3>
            <el-table :data="state.info" @selection-change="questionSelect">
                <el-table-column type="selection" width="35" />
                <el-table-column type="expand">
                    <template #default="props">
                        <div class="expand-block">
                            <h4 class="title">题目详情：</h4>
                            <div class="question-zone">
                                <p style="margin: 0px;"> {{ props.row.body }}</p>
                                <div id="choices-zone">
                                    <span class="choices">A:&nbsp&nbsp{{ props.row.choices_1 }}</span>
                                    <span class="choices">B:&nbsp&nbsp{{ props.row.choices_2 }}</span>
                                    <span class="choices">C:&nbsp&nbsp{{ props.row.choices_3 }}</span>
                                    <span class="choices">D:&nbsp&nbsp{{ props.row.choices_4 }}</span>
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
            </el-table>
        </div>
        <!-- <div class="middle">
            <el-button type="primary" ac>
                <el-icon>
                    <DArrowRight />
                </el-icon>
            </el-button>
        </div> -->
        <div class="right">
            <h3 style="margin-top: 0;">已选择</h3>
            <el-table :data="state.selected">
                <el-table-column prop="body" label="题目">
                    <template #default="scope">
                        <span class="one-line">{{ scope.row.body }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-row justify="end" style="margin-top: 15px;">
                <el-button type="success" @click="submitBtn">
                    提交
                    <el-icon class="el-icon--right">
                        <CircleCheck />
                    </el-icon>
                </el-button>
            </el-row>

        </div>
    </div>
</template>

<script setup>
import axios from '../utils/axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

const router = useRouter()
const state = reactive({
    info: [],
    selected: [],
})

axios.get('singleChoice/').then((res) => {
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

//多选事件
const questionSelect = (question) => {
    state.selected = question
}

const submitBtn = () => {
    ElMessage({ message: '已提交至试卷', type: 'success' })
    console.log(state.selected)
}

</script>

<style scoped>
.container {
    display: flex;
}

.left {
    width: 70%;
    padding-right: 10px;
}

/* .middle {
    width: 3%;
    display: flex;
    align-items: center;
    justify-content: center;
} */

.right {
    width: 30%;
    height: 100%;
    /* border-left: 1px solid #CDD0D6; */
    padding-left: 10px;
}

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