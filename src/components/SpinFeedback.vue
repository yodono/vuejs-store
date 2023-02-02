<script setup lang="ts">
import { h } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';

const indicator = h(LoadingOutlined, {
	style: {
		fontSize: '24px'
	},
	spin: true
});
</script>

<template>
	<div class="spinner-content">
		<ASpin :indicator="indicator" tip="Loading..." />
	</div>
</template>

<style scoped>
.spinner-content {
	text-align: center;
	border-radius: 4px;
	margin-bottom: 20px;
	padding: 30px 50px;
	margin: 20px 0;
}
</style>
