<template>
    <div>
        <h4>选择题</h4>
        <el-table :data="state.choice">
            <el-table-column type="index" label="题号" width="70">
            </el-table-column>
            <el-table-column prop="body" label="题目">
            </el-table-column>
        </el-table>
        <h4>多选题</h4>
        <el-table :data="state.subjective">
            <el-table-column type="index" label="题号" width="70">
            </el-table-column>
            <el-table-column prop="body" label="题目">
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { reactive } from 'vue';

const state = reactive({
    choice: [],
    subjective: [],
})

const store = useStore()
state.choice = store.state.choice
state.subjective = store.state.subjective
console.log(state.choice)

</script>

<style lang="scss" scoped></style>