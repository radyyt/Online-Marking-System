<template>
    <div class="login-body">
        <div class="login-container">
            <div class="head">
                <span id="title">在线阅卷系统</span>
            </div>
            <el-tabs type="border-card" stretch>
                <el-tab-pane label="学生登录">
                    <el-form label-position="top" :model="form">
                        <el-form-item label="账号">
                            <el-input v-model="form.username" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.password" />
                        </el-form-item>
                        <el-form-item class="button-item">
                            <el-button type=primary @click="onSubmit">立即登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="教师登录">
                    <el-form label-position="top" :model="form">
                        <el-form-item label="账号">
                            <el-input v-model="form.username" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.password" />
                        </el-form-item>
                        <el-form-item class="button-item">
                            <el-button type=primary @click="onSubmit">立即登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const form = reactive({
    username: '',
    password: '',
    check: function () {
        if (form.username != '' && form.password != '') return true;
        else return false
    }
})

const onSubmit = () => {
    console.log('submit')
    if (form.check()) {
        store.commit('login')
        console.log(store.state.isLogin)
        router.push('/home')
    }
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
    width: 400px;
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
    padding-left: 270px;
}
</style>