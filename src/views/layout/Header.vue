<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="1">图片</el-menu-item>
    <el-menu-item index="2">诗歌</el-menu-item>
    <el-menu-item index="3">歌曲</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="0">LOGO</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
