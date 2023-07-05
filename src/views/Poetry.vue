<template>
	<div v-show="poetry.val.title" class="poe-box">
		<div class="poe-title">《{{ poetry.val.title }}》</div>
		<div v-for="item in poetry.val.content" class="poe-content">
			{{ item }}
		</div>
		<div class="poe-author">--{{ poetry.val.dynasty }}·{{ poetry.val.author }}</div>
	</div>
</template>

<script setup>
import { reactive,inject,onMounted  } from 'vue';
const $http = inject('$http');



let poetry = reactive({ val: {} });

onMounted(() => {
	getNewImage();
});
let getNewImage = () => {
	console.log(this);

	$http
		.get(
			'https://v2.jinrishici.com/one.json?client=npm-sdk/1.0&X-User-Token=OGFrpjvnhgaIKrR9oRhA66KdRkaxFa0D'
		)
		.then(result => {
			console.log(result);
			poetry.val = result.data.data.origin;
		})
		.catch(err => {});
};
</script>

<style scoped>
@font-face {
	font-family: 'HYk2gj';
	src: url('/public/JXZhuoKai.woff');
}
.poe-box {
	font-family: 'HYk2gj';
    max-height: 700px;
    overflow-y: auto;
}
.poe-title,
.poe-content {
	text-align: center;
}
.poe-box {
	font-size: calc(24px + 1vw);
	width: 80vw;
	word-break: keep-all;
}
.poe-author {
	text-align: right;
}
</style>
