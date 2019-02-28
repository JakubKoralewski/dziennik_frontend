<template>
	<div class="nav" :class="{'navbar-hidden': !navBarVisible}">
		<div id="hide">
			<i class="fas fa-arrow-left" @click="navBarToggle()" :class="{'navbar-hidden': !navBarVisible}"></i>
		</div>
		<div id="o-mnie">O mnie</div>
		<div id="szkola">Szkoła</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	interface IData {
		elements: {
			[name: string]: HTMLElement;
		};
		navBarVisible: boolean;
	}

	export default Vue.extend({
		name: 'NavBar',
		data() {
			return {
				elements: {},
				navBarVisible: true,
			} as IData;
		},
		mounted() {
			const elements = {
				navBar: document.querySelector('div.nav'),
			};
			this.elements = Object.assign(this.elements, elements);
		},
		methods: {
			navBarToggle(el: HTMLElement, event: Event) {
				this.navBarVisible = !this.navBarVisible;
			},
			showArrow(el: HTMLElement) {
				console.log(el);
			},
		},
	});
</script>

<style scoped lang="scss">
	.nav {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		padding-top: 1rem;
		font-weight: 800;
		text-transform: uppercase;
		transition: all 0.2s ease-out;
		transition-property: width, padding;

		&.navbar-hidden {
			width: 0px !important;
			padding-left: 0 !important;
			padding-right: 0 !important;
			/* overflow: hidden; */

			div#o-mnie,
			div#szkola {
				transition: opacity 0.1s ease-out;
				opacity: 0;
			}
		}

		div:not(:nth-child(1)) {
			margin-top: 1rem;
		}

		#hide {
			margin-left: auto;
			cursor: pointer;
			position: relative;
			margin-bottom: 1rem;

			i {
				position: absolute;
				left: 0;

				&:hover {
					transition: transform 0.2s ease-in-out;
					transform: translateX(-5px);
				}

				&:after {
					content: '';
					position: absolute;
					height: 1rem;
					width: 8px;
				}

				transition: all 0.2s ease-out;
				transition-property: left, transform;

				&.navbar-hidden {
					position: absolute;
					left: calc(0.5rem + 1vmin);
					transform: rotate(180deg);

					&:hover {
						transform: rotate(180deg) translateX(-5px);
					}
				}
			}
		}

		div#o-mnie,
		div#szkola {
			display: flex;
			text-align: center;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			padding: 0rem;

			width: 100%;
			border-radius: 0.2rem;
			height: calc(2rem + 5vmin);

			cursor: pointer;
			transition: color 100ms ease-out;
			font-size: 1.1rem;
			background-color: darken($main-color, 3%);

			&:hover {
				color: darken($main-color, 50%);
			}
		}
	}
</style>
