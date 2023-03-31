<template>
    <div>
        <el-dialog v-model="dialogVisible" title="选择试卷" width="30%" align-center>
            <span>This is a message</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const dialogVisible = ref(false)
const handleDialog = () => {
    dialogVisible.value = true
}
defineExpose({
    handleDialog,

})

</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>