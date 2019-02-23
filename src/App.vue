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
	html {
		height: 100%;
		font-family: 'Montserrat', Arial, sans-serif;
	}

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

	.slide-enter-active,
	.slide-leave-active {
		transition: transform 0.5s ease-in-out;
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
	}
	.slide-leave,
	.slide-enter-to {
		transform: translateY(-100%);
	}
	// .slide-leave {
	// 	transform: translateY(-100vh);
	// }
</style>
