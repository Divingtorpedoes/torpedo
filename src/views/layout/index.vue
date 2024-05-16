<template>
	<div class="layout">
		<Header class="header" />
		<div class="content">
			<Menu />

			<div class="contain">
				<RouterView />
			</div>
		</div>
	</div>
</template>

<script setup>
import Header from './Header.vue';
import Menu from './Menu.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
.layout {
	width: 100%;
	height: 100%;
}

.header {
	width: 100%;
}
.content {
	height: calc(100% - 60px);
	display: flex;
}

.contain {
	flex: 1;


}
</style>
