<template>
    <div class="container">
        <div class="box">
            <h1 id="info">404 Not found!</h1>
            <RouterLink to="/">
                <el-button class="button">返回首页</el-button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
    // import { useRoute } from 'vue-router';
    // console.log(useRoute());
</script>

<style scoped>
.container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.box{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.button{
    width: 170px;
    height: 40px;
    font-size: 20px;
}
#info{
    font-size: 50px;
}
a:-webkit-any-link{
    text-decoration: none;
}
</style>