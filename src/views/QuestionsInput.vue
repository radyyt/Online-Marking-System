<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="选择题">
                <el-form :model="state.choiceForm" :rules="state.choiceFormRules" ref="choiceFormRef" label-width="100px"
                    label-position="left" status-icon hide-required-asterisk>
                    <el-form-item label="科目">
                        <el-select v-model="state.choiceForm.subject" placeholder="选择科目" filterable>
                            <el-option v-for="item in subjects" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="题目" prop="desc">
                        <el-input v-model="state.choiceForm.desc" type="textarea" autosize />
                    </el-form-item>
                    <el-form-item label="A选项" prop="choices_A">
                        <el-input v-model="state.choiceForm.choices_A" />
                    </el-form-item>
                    <el-form-item label="B选项" prop="choices_B">
                        <el-input v-model="state.choiceForm.choices_B" />
                    </el-form-item>
                    <el-form-item label="C选项" prop="choices_C">
                        <el-input v-model="state.choiceForm.choices_C" />
                    </el-form-item>
                    <el-form-item label="D选项" prop="choices_D">
                        <el-input v-model="state.choiceForm.choices_D" />
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-radio-group v-model="state.choiceForm.type">
                            <el-radio-button :label="0">单项选择</el-radio-button>
                            <el-radio-button :label="1">多项选择</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="正确答案" prop="answer">
                        <el-checkbox-group v-model="state.choiceForm.answer">
                            <el-checkbox label="A" name="type" />
                            <el-checkbox label="B" name="type" />
                            <el-checkbox label="C" name="type" />
                            <el-checkbox label="D" name="type" />
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="配图" prop="pic">
                        <el-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            :on-change="saveImg" :auto-upload="false">
                            <el-button type="primary">点击此处上传图片</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="choiceFormSubmit">提 交</el-button>
                        <el-button type="danger" @click="reset(choiceFormRef)">重 置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>


            <el-tab-pane label="填空题">
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
            </el-tab-pane>
            <el-tab-pane label="主观题">
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
                        <el-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            :on-change="saveImg" :auto-upload="false">
                            <el-button type="primary">点击此处上传图片</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="subjectiveFormSubmit">提 交</el-button>
                        <el-button type="danger" @click="reset(subjectiveFormRef)">重 置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from '../utils/axios'
import { ElMessage } from 'element-plus'

const store = useStore()
const subjects = store.state.subjects

const choiceFormRef = ref(null)
const blankFormRef = ref(null)
const subjectiveFormRef = ref(null)

const checkAnswer = (rule, value, callback) => {
    if (state.choiceForm.type == 0) {
        if (value.length == 1) {
            callback()
        } else {
            callback(new Error('单选题只有一个正确选项'))
        }
    } else {
        if (value.length >= 2) {
            callback()
        } else {
            callback(new Error('多选题至少有两个正确选项'))
        }
    }
}

const state = reactive({
    image: {},
    choiceForm: {
        desc: '',
        subject: 0,
        choices_A: '',
        choices_B: '',
        choices_C: '',
        choices_D: '',
        type: 0,
        answer: []
    },
    choiceFormRules: {
        desc: [
            { required: 'true', message: '请输入题目', trigger: 'blur' },
        ],
        choices_A: [
            { required: 'true', message: '请输入选项', trigger: 'blur' },
        ],
        choices_B: [
            { required: 'true', message: '请输入选项', trigger: 'blur' },
        ],
        choices_C: [
            { required: 'true', message: '请输入选项', trigger: 'blur' },
        ],
        choices_D: [
            { required: 'true', message: '请输入选项', trigger: 'blur' },
        ],
        type: [
            { required: 'true', message: '请选择类型', trigger: 'blur' }
        ],
        answer: [
            { required: 'true', message: '请勾选正确选项', trigger: 'blur' },
            { validator: checkAnswer, trigger: 'blur' }
        ]
    },
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

// const onSubmit = (formRef) => {
//     formRef.validate((valid) => {
//         if (valid) {
//             console.log('submit!')
//             console.log(formRef)
//         } else {
//             console.log('error submit!')
//         }
//     })
// }


const choiceFormSubmit = () => {
    let formData = new FormData()
    formData.append("body", state.choiceForm.desc)
    formData.append("choices_A", state.choiceForm.choices_A)
    formData.append("choices_B", state.choiceForm.choices_B)
    formData.append("choices_C", state.choiceForm.choices_C)
    formData.append("choices_D", state.choiceForm.choices_D)
    formData.append("correct_answer", state.choiceForm.answer.toString())
    formData.append("subject", state.choiceForm.subject)
    formData.append("type", state.choiceForm.type)
    if (JSON.stringify(state.image) !== '{}') formData.append("image", state.image.raw)

    choiceFormRef.value.validate((valid) => {
        if (valid) {
            console.log('choiceForm submit!')
            axios.post('choice/', formData
                , { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
                    console.log(res)
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
        } else {
            console.log('choiceForm error submit!')
        }
    })
}

const blankFormSubmit = () => {
    let formData = new FormData()
    formData.append("body", state.blankForm.desc)
    formData.append("blanks_num", state.blankForm.num)
    formData.append("subject", state.blankForm.subject)
    if (JSON.stringify(state.image) !== '{}') formData.append("image", state.image.raw)
    for (let i = 0; i < state.blankForm.num; i++) {
        formData.append("correct_answer_" + (i + 1), state.blankForm.answer[i].value)
    }

    blankFormRef.value.validate((valid) => {
        if (valid) {
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
    })
}

const subjectiveFormSubmit = () => {
    let formData = new FormData()
    formData.append("body", state.subjectiveForm.desc)
    formData.append("correct_answer", state.subjectiveForm.answer)
    formData.append("subject", state.subjectiveForm.subject)
    if (JSON.stringify(state.image) !== '{}') formData.append("image", state.image.raw)
    subjectiveFormRef.value.validate((valid) => {
        if (valid) {
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
    })
}

const reset = (formRef) => {
    formRef.resetFields()
}

</script>

<style lang="scss" scoped></style>