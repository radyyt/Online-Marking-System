<template>
    <div>
        <el-row :gutter="0">
            <el-col :span="7" :offset="0">
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
                    <!-- <el-form-item>
                        <el-select v-model="state.selectForm.studentId" placeholder="请选择学生" clearable filterable
                            @change="studentChange">
                            <el-option v-for="item in state.students" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                </el-form>
            </el-col>
            <el-col :span="1">
                <el-button type="primary" size="default" @click="gotoChart">成绩分析</el-button>

            </el-col>
        </el-row>
        <el-scrollbar max-height="80vh">
            <el-row>
                <el-col :span="6">
                    <el-table :data="state.students" highlight-current-row @current-change="handleCurrentChange">
                        <!-- <el-table-column type="index" /> -->
                        <el-table-column prop="student_id" label="学号" />
                        <el-table-column prop="name" label="姓名" />
                        <el-table-column prop="current_score.score" label="得分" width="70" />
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template #default="scope">
                                <el-button link type="primary" size="small" @click="editExamScore(scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="17" :offset="1">
                    <el-table :data="state.studentAnswer">
                        <!-- <el-table-column type="index" /> -->
                        <el-table-column prop="question_body" label="题目" />
                        <!-- <el-table-column prop="context" label="学生答案" width="120" />
                        <el-table-column prop="correct" label="正确答案" width="150" /> -->
                        <el-table-column prop="score" label="得分" width="70" />
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template #default="scope">
                                <el-button link type="primary" size="small"
                                    @click="editAnswerScore(scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-scrollbar>
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
import { inject, nextTick, reactive, ref } from 'vue';
import axios from '../utils/axios';
import { ElMessage, colorPickerContextKey } from 'element-plus';
import { useRouter } from 'vue-router';

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
    // console.log(state.filteredExams);

    //获取该班所有学生
    axios.get('student/', { params: { classes: classId } }).then(res => {
        state.students = res.data
    })
}

const examChange = () => {
    state.selectedExam = state.filteredExams.find(item => item.exam.id = state.selectForm.examId).exam

    // 获取所有学生的该试卷成绩
    state.students.forEach(item => {
        item.current_score = item.scores.find(item => item.title == state.selectedExam.title)
    })
}


const dialogVisible = ref(false)
let score = 0
let current = null

//编辑试卷分数功能
const editExamScore = (row) => {
    dialogVisible.value = true
    score = row.current_score.score
    current = row
    current.flag = 0
}

//编辑题目分数功能
const editAnswerScore = (row) => {
    console.log(row);
    dialogVisible.value = true
    score = row.score
    current = row
    current.flag = 1
}

const submitBtn = () => {
    let url = current.url
    if (current.flag == 0) {
        //获取到当前学生的url和scores
        let scores = current.scores
        // 将新的值放入scores数组中
        let index = scores.findIndex(item => item.title == current.current_score.title)
        scores[index].score = score
        // 发送到后端修改
        axios.patch(url, { scores: scores }, { baseURL: '' }).then(res => {
            // console.log(res.data);
            ElMessage({ message: '修改成功', type: 'success' })
        }, () => {
            ElMessage({ message: '修改失败', type: 'error' })
        })
    } else {
        current.score = score
        axios.patch(url, { score: score }, { baseURL: '' }).then(res => {
            console.log(res.data);
            ElMessage({ message: '修改成功', type: 'success' })
        }, () => {
            ElMessage({ message: '修改失败', type: 'error' })
        })
    }
    dialogVisible.value = false
}

//试卷分数详情
const handleCurrentChange = (currentRow) => {
    //获取当前学生的回答和得分
    let studentId = currentRow.id
    let examId = state.selectForm.examId
    axios.get('answer/', { params: { student: studentId, exam: examId } }).then(res => {
        state.studentAnswer = res.data
        // console.log(state.studentAnswer);
    })
}

//跳转到成绩分析页面
const router = useRouter()
const gotoChart = () => {
    router.push({ name: 'chart', params: { class: state.selectForm.classId, exam: state.selectForm.examId } })
}
</script>

<style lang="scss" scoped></style>