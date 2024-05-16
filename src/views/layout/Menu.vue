<template>
	<el-menu
		default-active="2"
		class="el-menu-vertical-demo"
		:collapse="isCollapse"
		@open="handleOpen"
		@close="handleClose"
		:router="true"
	>

		<el-menu-item index="/poetry">
			<el-icon><icon-menu /></el-icon>
			<template #title>页面三</template>
		</el-menu-item>
		<el-menu-item index="/image">
			<el-icon><icon-menu /></el-icon>
			<template #title>页面三</template>
		</el-menu-item>
		<el-menu-item index="/drop">
			<el-icon><icon-menu /></el-icon>
			<template #title>页面三</template>
		</el-menu-item>
	</el-menu>
</template>

<script setup>
import { ref } from 'vue';
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';

const isCollapse = ref(true);
const handleOpen = val => {
	console.log(val);
};
const handleClose = () => {};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
</style>
