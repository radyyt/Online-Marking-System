<template>
    <div>
        <el-row :gutter="0">
            <el-col :span="24" :offset="0">
                <el-form :model="state.selectForm" ref="selectFormRef" :inline="true" size="default">
                    <el-form-item>
                        <el-select v-model="state.selectForm.classId" placeholder="请选择班级" clearable filterable
                            @change="classChange">
                            <el-option v-for="item in state.classes" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="state.selectForm.examId" placeholder="请选择试卷" clearable filterable
                            @change="examChange">
                            <el-option v-for="item in state.filteredExams" :key="item.exam.id" :label="item.exam.title"
                                :value="item.exam.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="state.selectForm.studentId" placeholder="请选择学生" clearable filterable
                            @change="studentChange">
                            <el-option v-for="item in state.students" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="state.studentAnswer">
                <el-table-column type="index" />
                <el-table-column prop="question_body" label="题目" />
                <el-table-column prop="score" label="得分" width="180" />
                <el-table-column fixed="right" label="操作" width="120" align="center">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="editScore(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
    <el-dialog v-model="dialogVisible" title="编辑分数" width="30%" align-center>
        <el-input-number v-model="score" :min="0" size="large" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitBtn">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from '../utils/axios';
import { ElMessage } from 'element-plus';

const state = reactive({
    classes: [],
    exams: [],
    students: [],
    selectForm: {
        classId: undefined,
        examId: undefined,
        studentId: undefined,
    },
    studentAnswer: [],
    filteredExams: [],
    selectedExam: null,
})

//获取班级信息
axios.get('class/').then(res => {
    state.classes = res.data
})

//获取班级-试卷信息
axios.get('class-exam/').then(res => {
    state.exams = res.data
})

const classChange = () => {
    state.selectForm.examId = undefined
    state.selectForm.studentId = undefined
    let classId = state.selectForm.classId
    state.filteredExams = state.exams.filter(item => item.classes.id === state.selectForm.classId)
    axios.get('student/', { params: { classes: classId } }).then(res => {
        state.students = res.data
        console.log(state.students);
    })
}

const examChange = () => {
    state.selectedExam = state.filteredExams.find(item => item.exam.id = state.selectForm.examId).exam
}

const studentChange = () => {
    let studentId = state.selectForm.studentId
    let examId = state.selectForm.examId
    axios.get('answer/', { params: { student: studentId, exam: examId } }).then(res => {
        state.studentAnswer = res.data
        console.log(state.studentAnswer);
    })
}

//编辑分数功能
const dialogVisible = ref(false)
const score = ref(0)
const current = ref(null)

const editScore = (row) => {
    dialogVisible.value = true
    current.value = row
}

const submitBtn = () => {
    console.log(current.value);
    console.log(score.value);
    let url = current.value.url
    axios.patch(url, { score: score.value }, { baseURL: '' }).then(res => {
        console.log(res.data);
        ElMessage({ message: '修改成功', type: 'success' })
    }, () => {
        ElMessage({ message: '修改失败', type: 'error' })
    })
    // const examId = filteredExams.value.find(item => item.title === state.selectedTitle).id
    // const questions = selected.value.map(({ type, url, id }) => ({ type, question_url: url, exam: examId, question_id: id }))
    // axios.post('exam-question/', questions).then(() => {
    //     ElMessage({ message: '已提交至试卷:' + state.selectedTitle, type: 'success' })
    // }, () => {
    //     ElMessage({ message: '提交至试卷失败', type: 'error' })
    // })
    // saveSelectedExamId(examId)
    dialogVisible.value = false
}
</script>

<style lang="scss" scoped></style>