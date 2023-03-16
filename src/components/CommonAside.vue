<template>
    <div>
        <div class="logo">
            <el-icon size="30px" color="#E5EAF3">
                <Document />
            </el-icon>
            <span id="title">在线阅卷系统</span>
        </div>
        <div class="menu">
            <el-menu active-text-color="#79bbff" background-color="#545c64" class="el-menu-vertical-demo"
                text-color="#E5EAF3" :router=true style="border: 0;">
                <el-menu-item index="/home">
                    <el-icon>
                        <House />
                    </el-icon>
                    <span class="menu-title">首页</span>
                </el-menu-item>
                <el-menu-item index="/questions/input">
                    <el-icon>
                        <DocumentAdd />
                    </el-icon>
                    <span class="menu-title">题库录入</span>
                </el-menu-item>
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <DocumentChecked />
                        </el-icon>
                        <span class="menu-title">题目选择</span>
                    </template>
                    <el-menu-item-group title="客观题">
                        <el-menu-item index="/questions/single-choice">单项选择</el-menu-item>
                        <el-menu-item index="1-2">item two</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="主观题">
                        <el-menu-item index="1-3">item three</el-menu-item>
                    </el-menu-item-group>
                    <el-sub-menu index="1-4">
                        <template #title>item four</template>
                        <el-menu-item index="1-4-1">item one</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="/papers/publish">
                    <el-icon>
                        <Printer />
                    </el-icon>
                    <span class="menu-title">试卷发布</span>
                </el-menu-item>
                <el-menu-item index="/scores/correct">
                    <el-icon>
                        <DocumentAdd />
                    </el-icon>
                    <span class="menu-title">试卷批改</span>
                </el-menu-item>
                <el-menu-item index="/scores/manage">
                    <el-icon>
                        <DocumentAdd />
                    </el-icon>
                    <span class="menu-title">成绩管理</span>
                </el-menu-item>
                <el-menu-item index="/score/analysis">
                    <el-icon>
                        <DataAnalysis />
                    </el-icon>
                    <span class="menu-title">成绩分析</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script setup>
// const handleOpen = (key, keyPath) => {
//     console.log(key, keyPath)
// }
// const handleClose = (key, keyPath) => {
//     console.log(key, keyPath)
// }
const itemClick = (item) => {
    console.log(item)
}
</script>

<style scoped>
.logo {
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 20px;
    padding-left: 10px;
}

#title {
    font-size: 23px;
    font-weight: bold;
    margin-left: 5px;
    color: #E5EAF3;
}

.menu-title {
    padding-left: 10px;
    font-size: 17px;
}
</style>