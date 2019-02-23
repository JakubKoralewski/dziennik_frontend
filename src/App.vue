<template>
	<div id="app">
		<router-view class="router-view" />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({});
</script>


<style lang="scss">

	body {
		width: 100vw;
		height: 100vh;
	}

	#app {
		width: 100%;
		height: 100%;
	}

	.router-view {
		height: 100%;
	}

	* {
		margin: 0px;
		padding: 0px;
	}
</style>
