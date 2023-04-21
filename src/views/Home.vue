<template>
    <div class="container">
        <el-row>
            <el-carousel indicator-position="outside" type="card">
                <el-carousel-item v-for="item in pics" :key="item">
                    <el-image :src=item fit="contain"></el-image>
                </el-carousel-item>
            </el-carousel>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="text">
                    <div>欢迎进入在线阅卷系统</div>
                    <div>请从侧边栏进入功能页面</div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="calendar">
                    <el-calendar>
                        <template #date-cell="{ data }">
                            <p :class="data.isSelected ? 'is-selected' : ''">
                                {{ data.day.split('-').slice(1).join('-') }}
                                {{ data.isSelected ? '✔️' : '' }}
                            </p>
                        </template>
                    </el-calendar>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>

const pics = ["src/assets/1.jpg", "src/assets/2.jpg", "src/assets/3.jpg", "src/assets/4.jpg"]
</script>

<style scoped lang="scss">
.el-carousel {
    width: 90vw;
}

.el-carousel__item h3 {
    display: flex;
    justify-items: center;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.container {
    max-height: 85vh;
}

.el-calendar {
    --el-calendar-cell-width: 57px;
}

.text {
    background-color: #E6E8EB;
    border-radius: 4px;
    margin: 10px;
    height: 45vh;
    padding: 20px;
}

.text div {
    font-size: 35px;
    margin-bottom: 20px;
}
</style>