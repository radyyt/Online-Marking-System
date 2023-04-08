<template>
    <div>
        <el-form :model="state.subjectiveForm" :rules="state.subjectiveFormRules" ref="subjectiveFormRef"
            label-width="100px" label-position="left" status-icon hide-required-asterisk>
            <el-form-item label="科目">
                <el-select v-model="state.subjectiveForm.subject" placeholder="选择科目" filterable>
                    <el-option v-for="item in subjects" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="题目" prop="desc">
                <el-input v-model="state.subjectiveForm.desc" type="textarea" autosize />
            </el-form-item>
            <el-form-item label="答案" prop="answer">
                <el-input v-model="state.subjectiveForm.answer" type="textarea" autosize />
            </el-form-item>
            <el-form-item label="配图" prop="pic">
                <el-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :on-change="saveImg"
                    :auto-upload="false">
                    <el-button type="primary">点击此处上传图片</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="subjectiveFormSubmit">提 交</el-button>
                <el-button type="danger" @click="reset(subjectiveFormRef)">重 置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from '../utils/axios'
import { ElMessage,ElMessageBox } from 'element-plus'

const store = useStore()
const subjects = store.state.subjects

const subjectiveFormRef = ref(null)

const state = reactive({
    questionUrl: '',
    image: {},
    subjectiveForm: {
        desc: '',
        subject: 0,
        answer: ''
    },
    subjectiveFormRules: {
        desc: [
            { required: true, message: '请输入题目', trigger: 'blur' },
        ],
        answer: [
            { required: true, message: '请输入答案', trigger: 'blur' },
        ],
    }
})

const saveImg = (pic) => {
    state.image = pic
    console.log(pic)
    console.log(state.image)
}

const subjectiveFormSubmit = () => {
    let formData = new FormData()
    formData.append("body", state.subjectiveForm.desc)
    formData.append("correct_answer", state.subjectiveForm.answer)
    formData.append("subject", state.subjectiveForm.subject)
    if (JSON.stringify(state.image) !== '{}') formData.append("image", state.image.raw)
    subjectiveFormRef.value.validate((valid) => {
        if (valid) {
            const url = state.questionUrl
            if (url != '') {
                axios.put(url, formData
                    , { headers: { 'Content-Type': 'multipart/form-data' }, baseURL: '' }).then(res => {
                        console.log(res)
                        ElMessage({
                            message: '题目录入成功！',
                            type: 'success',
                        })
                    }, () => {
                        ElMessage({
                            message: '题目录入失败！',
                            type: 'error',
                        })
                    })
            } else {
                axios.post('subjective/', formData).then(res => {
                    ElMessage({
                        message: '题目录入成功！',
                        type: 'success',
                    })
                }, err => {
                    ElMessage({
                        message: '题目录入失败！',
                        type: 'error',
                    })
                })
            }

        }
    })
}

const reset = (formRef) => {
    formRef.resetFields()
}

const props = defineProps(['question'])
//修改问题页面处理
const handleQuestion = (q) => {
    const form = state.subjectiveForm
    form.desc = q.body
    form.subject = q.subject
    form.answer = q.correct_answer
    state.questionUrl = q.url
}
handleQuestion(props.question)
defineExpose({
    subjectiveFormSubmit,
})
</script>

<style lang="scss" scoped></style>