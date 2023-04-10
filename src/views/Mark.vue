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
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <div class="question-area">
                <div v-if="currentQuestion != null">
                    <h3>题目：</h3>
                    <el-row>
                        <div class="text">{{ currentQuestion.question_body }}</div>
                    </el-row>
                    <h3>正确答案：</h3>
                    <el-row>
                        <el-col>
                            <p v-if="currentQuestion.question_type == 2"
                                v-for="(item, index) in currentQuestion.correct.split(';')" class="text">
                                空{{ index + 1 }} : {{ item }}</p>
                            <p v-else class="text">
                                {{ currentQuestion.correct }}
                            </p>
                        </el-col>
                    </el-row>
                    <h3>学生答案：</h3>
                    <el-row>
                        <el-col>
                            <p v-if="currentQuestion.question_type == 2"
                                v-for="(item, index) in currentQuestion.context.split(';')" class="text">
                                空{{ index + 1 }} : {{ item }}</p>
                            <p v-else class="text">
                                {{ currentQuestion.context }}
                            </p>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="mark-area">
                <el-row>
                    <el-col :span="3">
                        <h2>得分：</h2>
                    </el-col>
                    <el-col :span="5">
                        <el-input-number v-model="score" :min="0" size="large" @change="handleChange" />
                    </el-col>
                    <el-col :span="5">
                        <el-button type="primary" size="large" @click="prevAnswer"
                            :disabled="state.answers.currentIndex == 0">上一份</el-button>
                        <el-button type="primary" size="large" @click="nextAnswer"
                            :disabled="state.answers.currentIndex == (state.answers.list.length - 1)">下一份</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-row>
        <el-row justify="center">
            <el-button-group>
                <el-button type="primary" :icon="ArrowLeft" @click="prevQuestion"
                    :disabled="state.questionId.currentIndex == 0">上一题</el-button>
                <el-button type="primary" @click="nextQuestion"
                    :disabled="state.questionId.currentIndex == (state.questionId.list.length - 1)">
                    下一题<el-icon class="el-icon--right">
                        <ArrowRight />
                    </el-icon>
                </el-button>
            </el-button-group>
        </el-row>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from '../utils/axios';
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';

const state = reactive({
    classes: [],
    exams: [],
    questionId: {
        list: [],
        currentIndex: 0,
    },
    filteredExams: [],
    selectForm: {
        classId: undefined,
        examId: undefined
    },
    selectedExam: null,
    answers: {
        list: [],
        currentIndex: 0,
    },
})

const currentQuestion = ref(null)


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
    state.filteredExams = state.exams.filter(item => item.classes.id === state.selectForm.classId)
}

const examChange = () => {
    state.selectedExam = state.filteredExams.find(item => item.exam.id = state.selectForm.examId).exam
    const examId = state.selectedExam.id

    //获取问题的id
    axios.get('exam-question/', { params: { exam: examId } }).then(res => {
        state.questionId.list = res.data.filter(item => item.type == 2 || item.type == 3).map(item => item.question_id)
        console.log(state.filteredExams.find(item => item.exam.id = state.selectForm.examId));
        axios.get('answer/', { params: { question_id: state.questionId.list[0] } }).then(res => {
            state.answers.list = res.data
            currentQuestion.value = res.data[0]
        })
    })
}

const score = ref(0)
//切换问题
const prevQuestion = () => {
    state.answers.list = []
    state.answers.currentIndex = 0
    state.questionId.currentIndex = state.questionId.currentIndex - 1
    axios.get('answer/', { params: { question_id: state.questionId.list[state.questionId.currentIndex] } }).then(res => {
        state.answers.list = res.data
        currentQuestion.value = res.data[0]
    })
}
const nextQuestion = () => {
    state.answers.list = []
    state.answers.currentIndex = 0
    state.questionId.currentIndex = state.questionId.currentIndex + 1
    axios.get('answer/', { params: { question_id: state.questionId.list[state.questionId.currentIndex] } }).then(res => {
        state.answers.list = res.data
        console.log(state.answers.list)
        currentQuestion.value = res.data[0]
    })
}

//切换答案
const prevAnswer = () => {
    state.answers.currentIndex = state.answers.currentIndex - 1
    currentQuestion.value = state.answers.list[state.answers.currentIndex]
}
const nextAnswer = () => {
    state.answers.currentIndex = state.answers.currentIndex + 1
    currentQuestion.value = state.answers.list[state.answers.currentIndex]
}

//上传得分
const handleChange = () => {
    let url = currentQuestion.value.url
    axios.patch(url, { score: score.value }, { baseURL: '' }).then(() => {
        ElMessage({
            message: '计分成功！',
            type: 'success',
        })
    }).catch(() => {
        ElMessage({
            message: '计分失败！',
            type: 'error',
        })
    })
}
</script>

<style lang="scss" scoped>
.question-area {
    background-color: #F2F3F5;

    margin: {
        left: 5vw;
        right: 5vw;
        top: 2vh;
        bottom: 2vh;
    }

    width: 80vw;
    height: 50vh;
    border-radius: 4px;
    border: 1px solid;

    h3 {
        margin-left: 20px;
    }
}

.mark-area {
    height: 20vh;
    width: 80vw;
    border-radius: 4px;
    border: 1px solid;

    margin: {
        left: 5vw;
        right: 5vw;
        bottom: 3vh;
    }

    h2 {
        margin-left: 20px;
        margin-top: 0px;
    }

    .el-col {
        margin: {
            top: 19px;
        }
    }
}

.text {
    font-size: 20px;
    margin-left: 40px;
}
</style>