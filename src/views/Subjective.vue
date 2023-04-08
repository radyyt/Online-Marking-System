<template>
    <div class="container">
        <SelectExam ref="selectExamRef" />
        <el-dialog v-model="dialogVisible" title="编辑试卷" width="50%" :before-close="handleClose" align-center>
            <SubjectiveInput :question="state.current" ref="subjectiveInputRef" />
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
                    <el-button @click="clearFilter()" type="danger">清除筛选</el-button>
                </el-col>
            </el-row>
            <el-table :data="state.info" @selection-change="questionSelect" ref="tableRef">
                <el-table-column type="selection" width="35" />
                <el-table-column type="expand">
                    <template #default="props">
                        <div class="expand-block">
                            <h4 class="title">题目详情：</h4>
                            <div class="question-zone">
                                <el-row align="middle">
                                    <el-col :span="14">
                                        <p style="margin: 0px;"> {{ props.row.body }}</p>
                                    </el-col>
                                    <el-col :span="8" :offset="2">
                                        <el-image fit="fill" :src=props.row.image />
                                    </el-col>
                                </el-row>
                            </div>
                            <h4 class="title">正确答案：</h4>
                            <div class="question-zone">
                                <p style="margin: 0px;"> {{ props.row.correct_answer }}</p>
                            </div>
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
import { reactive, ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import SelectExam from '../components/SelectExam.vue';
import SubjectiveInput from '../components/SubjectiveInput.vue';


const tableRef = ref()
const store = useStore()
//保存选中题目到store
const saveSubjective = (value) => store.dispatch('saveSubjective', value)

const router = useRouter()
const state = reactive({
    info: [],
    selected: [],
})

axios.get('subjective/').then((res) => {
    // console.log(res)
    state.info = res.data
})

//跳转事件
const goto = (index) => {
    console.log(index)
    // router.push({ path: '/' })
}

//学科标签过滤
const filterSubject = (value, row) => {
    return row.subject_name === value
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
    //添加type字段（3表示主观题)
    state.selected.forEach(item => item.type = 3)
    console.log(state.selected);
    saveSelected(state.selected)
}

//清除筛选
const clearFilter = () => {
    tableRef.value.clearFilter()
}

//删除题目
const deleteQuestion = inject('deleteQuestion')
// const reload = inject('reload')
// const deleteQuestion = (url) => {
//     let str = url.slice(26)
//     axios.delete(str).then(res => {
//         console.log(res)
//         reload()
//     })
// }

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
const subjectiveInputRef = ref(null)
const sumbitChange = () => {
    subjectiveInputRef.value.subjectiveFormSubmit()
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