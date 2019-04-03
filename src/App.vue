<template>
	<div id="app">
		<transition name="slide">
			<router-view class="router-view" :class="{'no-animation': !urlChanged}"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Watch } from 'vue-property-decorator';

	@Component({
		name: 'App',
	})
	export default class App extends Vue {
		urlChanged: boolean = false;

		@Watch('$route')
		onRouteChange() {
			if (this.$route.name !== 'Unauthorized') {
				this.urlChanged = true;
			}
		}
	}
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

	.no-animation {
		transform: translateY(0%) !important;
	}

	.slide-enter-active,
	.slide-leave-active {
		transition: transform 0.5s ease-out, opacity 0.25s ease-in;
	}

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
</style>
