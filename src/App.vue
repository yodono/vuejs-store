<script setup lang="ts">
import Navbar from './components/TopNavbar.vue';
</script>

<template>
	<div id="app">
		<Navbar />

		<div class="container">
			<RouterView />
		</div>
	</div>
</template>

<style>
body {
	margin: 0;
}

* {
	box-sizing: border-box;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
