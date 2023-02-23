<script setup>
import CommonHeader from './components/CommonHeader.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <CommonHeader />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>