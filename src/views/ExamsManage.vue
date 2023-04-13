<template>
    <div>
        <el-row class="header" :gutter="20">
            <el-col>
                <el-button type="primary" @click="dialogVisible = true">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <span>添加试卷</span>
                </el-button>
                <el-button type="primary" @click="dialogVisible1 = true">
                    <el-icon>
                        <MagicStick />
                    </el-icon>
                    <span>随机组卷</span>
                </el-button>
            </el-col>
        </el-row>
        <el-space warp size="default">
            <el-card class="box-card" v-for="item in state.info" :key="item.id" shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>{{ item.title }}</span>
                        <el-button-group>
                            <el-button type="info" size="default" @click="showExamDetail(item)"><el-icon>
                                    <View />
                                </el-icon></el-button>
                            <el-button type="info" size="default" @click="printExam(item)"><el-icon>
                                    <Printer />
                                </el-icon></el-button>
                            <el-button type="info" size="default" @click="deleteExam(item)"><el-icon>
                                    <Delete />
                                </el-icon></el-button>
                        </el-button-group>
                    </div>
                </template>
                <div class="text item">科目：{{ item.subject_name }}</div>
                <div class="text item">创建者：{{ item.author.username }}</div>
                <div class="text item">创建时间：{{ item.create_time }}</div>
                <div class="text item">描述：{{ item.desc }}</div>
            </el-card>
        </el-space>
        <el-dialog v-model="dialogVisible" title="新建试卷" width="30%" align-center>
            <el-form :model="state.formData">
                <el-form-item label="名称">
                    <el-input v-model="state.formData.title" placeholder="新试卷" />
                </el-form-item>
                <el-form-item label="科目">
                    <el-select v-model="state.formData.subject">
                        <el-option v-for="item in subjects" :value="item.value" :label="item.label" />
                    </el-select>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="state.formData.desc" :rows="2" type="textarea" placeholder="请输入描述..." />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addExam">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible1" title="随机组卷" width="30%" align-center>
            <el-form :model="state.randomForm" label-width="100px">
                <el-form-item label="科目">
                    <el-select v-model="state.randomForm.subject">
                        <el-option v-for="item in subjects" :value="item.value" :label="item.label" />
                    </el-select>
                </el-form-item>
                <el-form-item label="试卷名称">
                    <el-input v-model="state.randomForm.title" placeholder="新试卷" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="state.randomForm.desc" :rows="2" type="textarea" placeholder="请输入描述..." />
                </el-form-item>
                <el-form-item label="单选题数量">
                    <el-input-number v-model="state.randomForm.singleNum" />
                </el-form-item>
                <el-form-item label="多选题数量">
                    <el-input-number v-model="state.randomForm.multipleNum" />
                </el-form-item>
                <el-form-item label="填空题数量">
                    <el-input-number v-model="state.randomForm.blankNum" />
                </el-form-item>
                <el-form-item label="主观题数量">
                    <el-input-number v-model="state.randomForm.subjectiveNum" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取消</el-button>
                    <el-button type="primary" @click="randomExam">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from '../utils/axios'
import { inject, reactive, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from 'vuex';

const store = useStore()
const reload = inject('reload')
const state = reactive({
    info: [],
    formData: {
        title: '',
        subject: undefined,
        desc: ''
    },
    randomForm: {
        subject: undefined,
        title: '',
        desc: '',
        singleNum: 0,
        multipleNum: 0,
        blankNum: 0,
        subjectiveNum: 0
    }
})
const subjects = store.state.subjects

//从后端获取试卷信息
axios.get('exam/').then((res) => {
    state.info = res.data
})

//新增试卷
const dialogVisible = ref(false)
const addExam = () => {
    dialogVisible.value = false
    axios.post('exam/', {
        title: state.formData.title,
        subject: state.formData.subject,
        desc: state.formData.desc
    }).then(res => {
        console.log(res);
        reload()
    }).catch(() => {
        ElMessage({
            message: '新建试卷失败！',
            type: 'error',
        })
    })
}

//试卷详情
const router = useRouter()
const showExamDetail = (item) => {
    router.push({ name: 'examDetail', params: { examId: item.id } })
}

//打印试卷
const printExam = (item) => {
    console.log('print');
    axios.get('http://127.0.0.1:8000/api/exam/' + item.id + '/exam-pdf/').then(res => {
        window.open(res.data)
    })
}

//删除试卷
const deleteExam = (item) => {
    const url = item.url
    ElMessageBox.confirm(
        '确定要删除该试卷吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            axios.delete(url, { baseURL: '' }).then(res => {
                console.log(res)
                reload()
            })
            ElMessage({
                type: 'success',
                message: '成功删除',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

//随机组卷
const dialogVisible1 = ref(false)
const randomExam = () => {
    dialogVisible1.value = false
    let examId = undefined
    //新建试卷
    axios.post('exam/', {
        title: state.randomForm.title,
        subject: state.randomForm.subject,
        desc: state.randomForm.desc
    }).then(res => {
        console.log(res);
        examId = res.data.id
        reload()
    }).catch(() => {
        ElMessage({
            message: '新建试卷失败！',
            type: 'error',
        })
    })
    const questions = []
    //获取随机选择题
    axios.get('choice/random/', { params: { singleNum: state.randomForm.singleNum, multipleNum: state.randomForm.multipleNum, subject: state.randomForm.subject } }).then(res => {
        for (let item of res.data) {
            questions.push(item)
        }
        // 获取随机填空题
        axios.get('blank/random/', { params: { num: state.randomForm.blankNum, subject: state.randomForm.subject } }).then(res => {
            for (let item of res.data) {
                questions.push(item)
            }
            axios.get('subjective/random/', { params: { num: state.randomForm.subjectiveNum, subject: state.randomForm.subject } }).then(res => {
                for (let item of res.data) {
                    questions.push(item)
                }
            }).finally(() => {
                questions.forEach(item => item.exam = examId)
                console.log(questions);
                axios.post('exam-question/', questions).then(() => {
                    ElMessage({ message: '已提交至试卷:' + state.randomForm.title, type: 'success' })
                }, () => {
                    ElMessage({ message: '提交至试卷失败', type: 'error' })
                })
            })
        })
    })
}
</script>

<style lang="scss" scoped>
.header {
    margin-bottom: 30px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 400px;
}
</style>