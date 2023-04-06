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
                            <el-button type="info" size="default" @click="printExam"><el-icon>
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
        subject: '',
        desc: ''
    },
})
const subjects = store.state.subjects

//从后端获取试卷信息
axios.get('exam/').then((res) => {
    state.info = res.data
    console.log(state.info);
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
const printExam = () => {
    console.log('print');
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