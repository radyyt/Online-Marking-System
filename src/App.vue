<script setup>
import CommonHeader from './components/CommonHeader.vue'
import CommonAside from './components/CommonAside.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="common-aside">
          <CommonAside />
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader />
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-aside{
  width: 200px;
  height: 100vh;
  background-color: #545c64;
}
</style>