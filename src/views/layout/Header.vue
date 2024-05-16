<template>
	<div class="header-box"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
</script>

<style lang="less" scoped>
.header-box {
	height: 60px;
	border-bottom: 1px solid var(--el-menu-border-color);
	padding-bottom: 1px;
}
</style>
