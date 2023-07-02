<template>
  <div ></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue';

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles'
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>

</style>
