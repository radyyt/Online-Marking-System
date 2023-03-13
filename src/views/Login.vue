<template>
    <div class="login-body">
        <div class="login-container">
            <div class="head">
                <span id="title">在线阅卷系统</span>
            </div>
            <el-form label-position="top" :model="state.form" :rules="state.rules" class="form" ref="loginForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="state.form.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="state.form.password" type="password"/>
                </el-form-item>
                <el-form-item class="button-item">
                    <el-button type=primary @click="onSubmit" size="large">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from '../utils/axios';

const store = useStore()
const router = useRouter()
const loginForm = ref(null)
const state = reactive({
    form: {
        username: '',
        password: ''
    },
    //表单验证规则
    rules: {
        username: [
            { required: true, message: "请输入用户名", trigger: blur }
        ],
        password: [
            { required: true, message: "请输入密码", trigger: blur }
        ]
    }
})


const onSubmit = () => {
    console.log('submit')

    // loginForm.value.validate((valid) => {
    //     if (valid) {
    //         axios.post('token/', {
    //             userame: state.form.username,
    //             password: state.form.password
    //         }).then(res => {
    //             console.log(res)
    //         })
    //     } else {
    //         console.log('error submit!!')
    //         return false;
    //     }
    // })

    axios.post('token/', {
                username: state.form.username,
                password: state.form.password
            }).then(res => {
                console.log(res)
                const expiredTime = Date.parse(res.headers.date) + 1800000
                localStorage.setItem('access_token',res.data.access)
                localStorage.setItem('refresh_token',res.data.refresh)
                localStorage.setItem('expired_time',expiredTime)

                //登录成功后跳转到首页
                router.push({path: '/home'})
            })
}


</script>

<style scoped>
.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
}

.login-container {
    width: 350px;
    height: 350px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}

.head {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 30px;
}

#title {
    font-size: 30px;
    font-weight: bold;
    margin-left: 5px;
    color: #409EFF;
}

.button-item {
    padding-top: 20px;
    padding-left: 200px;
}

.form {
    width: 300px;
    margin-left: 23px;
}
</style>