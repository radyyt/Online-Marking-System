<template>
    <div>
        <el-row :gutter="0">
            <el-col :span="24" :offset="0">
                <el-form :model="state.selectForm" ref="selectFormRef" :inline="true" size="default">
                    <el-form-item>
                        <el-select v-model="state.selectForm.classId" placeholder="请选择班级" clearable filterable
                            @change="classChange">
                            <el-option v-for="item in state.classes" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="state.selectForm.examId" placeholder="请选择试卷" clearable filterable
                            @change="examChange">
                            <el-option v-for="item in state.filteredExams" :key="item.exam.id" :label="item.exam.title"
                                :value="item.exam.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="state.selectForm.studentId" placeholder="请选择学生" clearable filterable
                            @change="studentChange">
                            <el-option v-for="item in state.students" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const chartRef = ref(null)

</script>

<style lang="scss" scoped></style>