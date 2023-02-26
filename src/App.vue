<script setup>
import CommonHeader from './components/CommonHeader.vue'
import CommonAside from './components/CommonAside.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <CommonAside />
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader />
        </el-header>
        <el-main>
          main
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped></style>