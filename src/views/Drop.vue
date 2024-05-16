<template>
	<div class="drag-form">
		<h2>基于 Transition 的拖拽表单功能</h2>
		<section class="content">
			<div class="sidebar">
				<div
					class="sidebar-item"
					draggable="true"
					v-for="item in sidebarList"
					:key="item.key"
					@dragstart="onSidebarStart(item.type)"
				>
					{{ item.label }} - {{ item.type }}
				</div>
			</div>
			<div class="form-box" @dragover="onFormMove($event)">
				<transition-group name="group" tag="div">
					<div
						class="form-item"
						draggable="true"
						v-for="(item, index) in formList"
						:key="item.key"
						:data-key="item.key"
						@dragstart="onDragStart(index)"
						@dragover="onDragMove($event, index)"
						@drop="onDropEnd()"
					>
						<p>{{ item.label }}</p>
						<el-input class="input-text" v-if="item.type === 'input'" type="text" placeholder="请输入" />
						<template v-if="item.type === 'checkbox'">
							<el-checkbox-group v-model="checkList">
								<el-checkbox label="Option A" value="Value A" />
								<el-checkbox label="Option B" value="Value B" />
								<el-checkbox label="Option C" value="Value C" />
								<el-checkbox label="disabled" value="Value disabled" disabled />
								<el-checkbox label="selected and disabled" value="Value selected and disabled" disabled />
							</el-checkbox-group>
						</template>
						<el-select
							class="input-select"
							v-if="item.type === 'select'"
							type="search"
							placeholder="请选择"
						/>
					</div>
				</transition-group>
			</div>
		</section>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

namespace DragType {
	interface Base {
		/** 前端新增时设置的唯一值 */
		key: string;
		/** 类型标识 */
		label: string;
	}

	interface Input extends Base {
		type: 'input';
		value: string;
	}

	interface Select extends Base {
		type: 'select';
		value: number;
	}

	interface Checkbox extends Base {
		type: 'checkbox';
		value: Array<string>;
	}

	export type Keys = 'input' | 'select' | 'checkbox';

	export interface Map {
		input: Input;
		select: Select;
		checkbox: Checkbox;
	}
}

function useFormItem<K extends keyof DragType.Map>(type: K) {
	const map: DragType.Map = {
		input: {
			key: `input-${Date.now()}`,
			label: '输入框',
			value: '',
			type: 'input'
		},
		select: {
			key: `select-${Date.now()}`,
			label: '下拉选择',
			value: 0,
			type: 'select'
		},
		checkbox: {
			key: `checkbox-${Date.now()}`,
			label: '多选框',
			value: [],
			type: 'checkbox'
		}
	};
	return map[type];
}

const sidebarList = [useFormItem('input'), useFormItem('select'), useFormItem('checkbox')];

type List = typeof sidebarList;

const formList = ref<List>([]);

const sidebar = {
	/** 是否为侧边栏拖动过来 */
	isDrag: false,
	/** 拖动的类型 */
	type: 'input' as DragType.Keys
};

/**
 * 侧边拖拽开始
 * @param type
 */
function onSidebarStart(type: DragType.Keys) {
	current.index = -1;
	sidebar.isDrag = true;
	sidebar.type = type;
}

/**
 * 表单容器拖拽中事件
 * @param event
 */
function onFormMove(event: DragEvent) {
	event.preventDefault();
	if (sidebar.isDrag) {
		formList.value.push(useFormItem(sidebar.type));
		current.index = formList.value.length - 1;
		sidebar.isDrag = false;
	}
}

const current = {
	index: -1
};

const target = {
	key: ''
};

/**
 * 拖拽`form-item`开始
 * @param index
 */
function onDragStart(index: number) {
	current.index = index;
}

/** 拖拽`form-item`结束 */
function onDropEnd() {
	current.index = -1;
	sidebar.isDrag = false;
}

/**
 * 拖拽`form-item`移动中
 * @param event
 * @param targetIndex
 */
function onDragMove(event: DragEvent, targetIndex: number) {
	event.preventDefault();
	if (current.index < 0) return;
	const el = event.target as HTMLElement;
	const targetKey = el.dataset.key!;
	if (!targetKey || targetKey === target.key) return;
	target.key = targetKey;
	// 记录原始数据字符串，下面做对比用
	const str = JSON.stringify(formList.value);
	// 拷贝响应数据
	const ls: List = JSON.parse(str);
	// 交替数组位置
	[ls[current.index], ls[targetIndex]] = [ls[targetIndex], ls[current.index]];
	// 上一次修改如何和当前数组一致则不重新赋值
	if (str === JSON.stringify(ls)) return;
	// 最终赋值给响应数据
	formList.value = ls;
	// 更新当前索引，必须！！！
	current.index = targetIndex;
}
</script>
<style>
.drag-form {
	width: 100%;
	padding: 14px;
}

.drag-form h2 {
	margin-bottom: 14px;
}

.drag-form .content {
	display: flex;
}

.drag-form .content .sidebar {
	width: 220px;
	margin-right: 20px;
	border: solid 1px #ccc;
	padding: 14px;
	color: #000;
}

.drag-form .content .sidebar-item {
	cursor: move;
	user-select: none;
	padding: 20px 14px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #f9f9f9;
	margin-bottom: 14px;
}

.drag-form .content .form-box {
	flex: 1;
	border: dashed 1px #409eff;
	padding: 14px;
}

.drag-form .content .form-item {
	background-color: #ecf5ff;
	padding: 14px;
	cursor: move;
	user-select: none;
	color: #000;
}

.drag-form .content .form-item + .form-item {
	margin-top: 14px;
}

.drag-form .input-text,
.drag-form .input-select {
	border: solid 1px #409eff;
	outline: none;
	width: 160px;
}

.drag-form .input-select {
	border-color: #c0c4cc;
}

.group-move,
.group-enter-active,
.group-leave-active {
	transition: 0.3s all;
}

.group-enter-from,
.group-leave-to {
	opacity: 0;
	transform: translate3d(0px, 30px, 0);
}

.group-leave-active {
	position: absolute;
}
</style>
