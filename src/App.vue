<template>
	<div id="app">
		<transition :name="transitionName">
			<router-view class="router-view"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Watch } from 'vue-property-decorator';
	import { mapState, mapMutations } from 'vuex';

	const DEFAULT_TRANSITION = '';

	@Component({
		name: 'App',
		computed: mapState(['currentURL']),
		methods: mapMutations(['setCurrentURL']),
	})
	export default class App extends Vue {
		transitionName = DEFAULT_TRANSITION;

		@Watch('$route')
		onRouteChange(newRoute: any, oldRoute: any) {
			console.log('RouteChange!');
			let transition = newRoute.meta.transition || oldRoute.meta.transition;

			/** The following checks if either of the routes' meta.transition.from
			 *  is same as the other's name. If it is then it should transition. */
			if (
				(newRoute.meta.hasOwnProperty('transition') && 
				newRoute.meta.transition.hasOwnProperty('from') 
				&& newRoute.meta.transition.from === oldRoute.name) 
				||
				(oldRoute.meta.hasOwnProperty('transition') && 
				oldRoute.meta.transition.hasOwnProperty('from') 
				&& oldRoute.meta.transition.from === newRoute.name) 
			) {
				this.transitionName = transition.name || DEFAULT_TRANSITION;
			} else {
				this.transitionName = '';
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
