<template>
    <div>
        <el-table :data="state.singleChoices">
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
    singleChoices: [],
})

const store = useStore()
state.singleChoices = store.state.singleChoices
console.log(state.singleChoices)

</script>

<style lang="scss" scoped></style>