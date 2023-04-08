<template>
    <div class="container">
        <SelectExam ref="selectExamRef" />
        <el-dialog v-model="dialogVisible" title="编辑试卷" width="50%" :before-close="handleClose" align-center>
            <ChoiceInput :question="state.current" ref="choiceInputRef" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="sumbitChange">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <div class="left">
            <el-row justify="space-between">
                <el-col :span="4">
                    <h3 style="margin-top: 0;">待选择</h3>
                </el-col>
                <el-col :span="2">
                    <!-- <el-button @click="clearFilter()" type="danger">清除筛选</el-button> -->
                </el-col>
            </el-row>
            <el-table :data="state.info" @selection-change="questionSelect" ref="tableRef">
                <el-table-column type="selection" width="35" />
                <el-table-column type="expand">
                    <template #default="props">
                        <div class="expand-block">
                            <h4 class="title">题目详情：</h4>
                            <div class="question-zone" v-if="props.row.image != null">
                                <el-row align="middle">
                                    <el-col :span="18">
                                        <p style="margin: 0px;"> {{ props.row.body }}</p>
                                        <div id="choices-zone">
                                            <span class="choices">A:&nbsp&nbsp{{ props.row.choices_A }}</span>
                                            <span class="choices">B:&nbsp&nbsp{{ props.row.choices_B }}</span>
                                            <span class="choices">C:&nbsp&nbsp{{ props.row.choices_C }}</span>
                                            <span class="choices">D:&nbsp&nbsp{{ props.row.choices_D }}</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="4" :offset="2">
                                        <el-image fit="contain" :src=props.row.image />
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="question-zone" v-else>
                                <el-row align="middle">
                                    <el-col>
                                        <p style="margin: 0px;"> {{ props.row.body }}</p>
                                        <div id="choices-zone">
                                            <span class="choices">A:&nbsp&nbsp{{ props.row.choices_A }}</span>
                                            <span class="choices">B:&nbsp&nbsp{{ props.row.choices_B }}</span>
                                            <span class="choices">C:&nbsp&nbsp{{ props.row.choices_C }}</span>
                                            <span class="choices">D:&nbsp&nbsp{{ props.row.choices_D }}</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <h4 class="title">正确答案：{{ props.row.correct_answer }}</h4>
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
                    { text: '政治', value: '政治' },
                ]" :filter-method="filterSubject" filter-placement="bottom-end" header-align="center" align="center">
                    <template #default="scope">
                        <el-tag>{{ scope.row.subject_name }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="100" :filters="[
                    { text: '单项选择', value: '单项选择' },
                    { text: '多项选择', value: '多项选择' },
                ]" :filter-method="filterType" filter-placement="bottom-end" header-align="center" align="center">
                    <template #default="scope">
                        <el-tag>{{ scope.row.type_name }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120" align="center">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="editQuestion(scope.row)">编辑</el-button>
                        <el-button link type="danger" size="small" @click="deleteQuestion(scope.row.url)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="right">
            <h3 style="margin-top: 0;">已选择</h3>
            <el-table :data="state.selected">
                <el-table-column prop="body" label="题目">
                    <template #default="scope">
                        <span class="one-line">{{ scope.row.body }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="100" header-align="center" align="center" sortable>
                    <template #default="scope">
                        <el-tag>{{ scope.row.type_name }}</el-tag>
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
import { reactive, ref, inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useStore } from 'vuex';
import SelectExam from '../components/SelectExam.vue';
import ChoiceInput from '../components/ChoiceInput.vue';

const tableRef = ref(null)

const store = useStore()
const router = useRouter()
const state = reactive({
    info: [],
    selected: [],
    current: null,
})

//获取题目信息
axios.get('choice/').then((res) => {
    // console.log(res)
    state.info = res.data
})

//学科标签过滤
const filterSubject = (value, row) => {
    return row.subject_name === value
}

//类型标签过滤
const filterType = (value, row) => {
    return row.type_name === value
}

//多选事件
const questionSelect = (question) => {
    state.selected = question
}

//提交到试卷
const selectExamRef = ref(null)
const saveSelected = (payload) => { store.commit('saveSelected', payload) }
const submitBtn = () => {
    selectExamRef.value.handleDialog()
    saveSelected(state.selected)
    // saveChoice(state.selected).then(() => {
    //     ElMessage({ message: '已提交至试卷', type: 'success' })
    // }, () => {
    //     ElMessage({ message: '提交至试卷失败', type: 'error' })
    // })
}

//清除筛选
const clearFilter = () => {
    tableRef.value.clearFilter()
}

//删除题目
const deleteQuestion = inject('deleteQuestion')

//编辑题目
const dialogVisible = ref(false)
const handleClose = (done) => {
    ElMessageBox.confirm(
        '将不会保存修改，确定要关闭吗?',
        'Warning',
        {
            confirmButtonText: '确认',
            cancelButtonText: '返回',
            type: 'warning',
        }
    ).then(() => {
        done()
    }).catch(() => {
        // catch error
    })
}
const editQuestion = (row) => {
    dialogVisible.value = true
    console.log(row);
    state.current = row
}
const choiceInputRef = ref(null)
const sumbitChange = () => {
    choiceInputRef.value.choiceFormSubmit()
    window.location.reload()
    dialogVisible.value = false
}

</script>

<style lang="scss"  scoped>
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