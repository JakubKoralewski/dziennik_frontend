<template>
	<div id="app">
		<transition name="slide">
			<!-- v-on:before-enter="beforeEnter"
			v-on:enter="await enter"
			v-on:leave="leave"
			v-bind:css="false"-->
			<router-view class="router-view"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		// methods: {
		// 	async enter(el: HTMLDivElement, done: Function) {
		// 		await new Promise(x => setTimeout(x, 100));
		// 		debugger;
		// 	},
		// },
	});
</script>


<style lang="scss">
	* {
		margin: 0px;
		padding: 0px;
	}

	html,
	body {
		height: 100%;
		width: 100%;
		overflow-x: hidden;
	}

	html {
		min-height: 100%;
		font-family: 'Montserrat', Arial, sans-serif;
		overflow-x: hidden;
	}

	body {
		width: 100%;
		height: 100%;
	}

	#app {
		width: 100%;
		height: 100%;
	}

	.router-view {
		height: 100%;
	}

	.slide-enter-active,
	.slide-leave-active {
		transition: transform 0.5s ease-out, opacity 0.25s ease-in;
	}

	// .slide-enter-active {
	// 	z-index: -10;
	// }

	// .slide-leave-active {
	// 	z-index: -10;
	// }

	.slide-enter,
	.slide-leave-to {
		transform: translateY(100%);
		opacity: 0;
	}
	.slide-leave,
	.slide-enter-to {
		transform: translateY(-100%);
		opacity: 1;
	}
	// .slide-leave {
	// 	transform: translateY(-100vh);
	// }
</style>
