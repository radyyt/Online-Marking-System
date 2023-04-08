<template>
    <div>
        <el-form :model="state.blankForm" :rules="state.blankFormRules" ref="blankFormRef" label-width="100px"
            label-position="left" status-icon hide-required-asterisk>
            <el-form-item label="科目">
                <el-select v-model="state.blankForm.subject" placeholder="选择科目" filterable>
                    <el-option v-for="item in subjects" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="题目" prop="desc">
                <el-input v-model="state.blankForm.desc" type="textarea" autosize />
            </el-form-item>
            <el-form-item v-for="(item, index) in state.blankForm.answer" :key="item.key" :label="'答案 ' + item.key"
                :prop="'answer[' + index + '].value'" :rules="{
                    required: true,
                    message: '请输入答案',
                    trigger: 'blur',
                }">
                <el-input v-model="item.value"></el-input>
            </el-form-item>
            <el-form-item>
                <el-tooltip effect="dark" content="最多可有3处填空" placement="right">
                    <el-button @click="addBlank" :disabled="isDisabled">添加答案</el-button>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="配图" prop="pic">
                <el-upload action="#" :on-change="saveImg" :auto-upload="false">
                    <el-button type="primary">点击此处上传图片</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="blankFormSubmit">提 交</el-button>
                <el-button type="danger" @click="reset(blankFormRef)">重 置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from '../utils/axios'
import { ElMessage } from 'element-plus'

const store = useStore()
const subjects = store.state.subjects

const blankFormRef = ref(null)

const state = reactive({
    questionUrl: '',
    image: {},
    blankForm: {
        desc: '',
        subject: 0,
        num: 1,
        answer: [
            { key: 1, value: '' },
        ],
    },
    blankFormRules: {
        desc: [
            { required: true, message: '请输入题目', trigger: 'blur' },
        ],
    },
})

const isDisabled = false
const addBlank = () => {
    if (state.blankForm.num == 3) isDisabled = true
    state.blankForm.num += 1
    state.blankForm.answer.push({
        key: state.blankForm.num,
        value: ''
    })
}

const saveImg = (pic) => {
    state.image = pic
    console.log(pic)
    console.log(state.image)
}

const blankFormSubmit = () => {
    let formData = new FormData()
    const url = state.questionUrl
    formData.append("body", state.blankForm.desc)
    formData.append("blanks_num", state.blankForm.num)
    formData.append("subject", state.blankForm.subject)
    if (JSON.stringify(state.image) !== '{}') formData.append("image", state.image.raw)
    for (let i = 0; i < state.blankForm.num; i++) {
        formData.append("correct_answer_" + (i + 1), state.blankForm.answer[i].value)
    }

    blankFormRef.value.validate((valid) => {
        if (valid) {
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
                axios.post('blank/', formData).then(res => {
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
    const form = state.blankForm
    form.desc = q.body
    form.subject = q.subject
    form.answer[0].value = q.correct_answer_1
    if (q.correct_answer_2 != null) {
        form.num = 2
        form.answer.push({ key: 2, value: q.correct_answer_2 })
    }
    if (q.correct_answer_3 != null) {
        form.num = 3
        form.answer.push({ key: 3, value: q.correct_answer_3 })
    }
    state.questionUrl = q.url
}
handleQuestion(props.question)
defineExpose({
    blankFormSubmit,
})
</script>

<style lang="scss" scoped></style>