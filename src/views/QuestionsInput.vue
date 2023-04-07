<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="选择题">
                <ChoiceInput />
            </el-tab-pane>
            <el-tab-pane label="填空题">
                <BlankInput />
            </el-tab-pane>
            <el-tab-pane label="主观题">
                <SubjectiveInput />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import ChoiceInput from '../components/ChoiceInput.vue'
import BlankInput from '../components/BlankInput.vue'
import SubjectiveInput from '../components/SubjectiveInput.vue'
</script>

<style lang="scss" scoped></style>