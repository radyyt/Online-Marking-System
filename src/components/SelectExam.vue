<template>
    <div>
        <el-dialog v-model="dialogVisible" title="选择试卷" width="30%" align-center>
            <el-select v-model="state.selectedSubject" placeholder="请选择科目" style="margin-right: 20px;" size="large"
                @change="state.selectedTitle = ''">
                <el-option v-for="item in subjects" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="state.selectedTitle" placeholder="请选择试卷" size="large">
                <el-option v-for="item in filteredExams" :key="item.id" :label="item.title" :value="item.title" />
            </el-select>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitBtn">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import axios from '../utils/axios';
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

const store = useStore()
const state = reactive({
    info: [],
    selectedSubject: undefined,
    selectedTitle: '',
})
const filteredExams = computed(() => state.info.filter((item) => item.subject == state.selectedSubject))
const dialogVisible = ref(false)
const handleDialog = () => {
    dialogVisible.value = true
}
defineExpose({
    handleDialog,
})

//从后端获取试卷信息
axios.get('exam/').then((res) => {
    state.info = res.data
    console.log(state.info);
})

const subjects = store.state.subjects
const selected = computed(() => store.state.selected)
const saveSelectedExamId = (payload) => { store.commit('saveSelectedExamId', payload) }

const submitBtn = () => {
    console.log(selected.value);
    const examId = filteredExams.value.find(item => item.title === state.selectedTitle).id
    const questions = selected.value.map(({ type, url }) => ({ type, question_url: url, exam: examId }))
    axios.post('exam-question/', questions).then(() => {
        ElMessage({ message: '已提交至试卷:' + state.selectedTitle, type: 'success' })
    }, () => {
        ElMessage({ message: '提交至试卷失败', type: 'error' })
    })
    saveSelectedExamId(examId)
    dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}

.tip {
    margin-top: 20px;
}
</style>