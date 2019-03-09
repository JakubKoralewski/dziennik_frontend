<template>
	<div class="nav" :class="{'SideBar-hidden': !sideBarVisible}">
		<a id="hide">
			<i
				class="fas fa-arrow-left"
				@click="SideBarToggle()"
				:class="{'SideBar-hidden': !sideBarVisible}"
			></i>
		</a>
		<a id="o-mnie" class="menu-item">O mnie</a>
		<a id="szkola" class="menu-item">Szkoła</a>
		<a
			href="https://github.com/JakubKoralewski/dziennik_php_frontend"
			title="GitHub repozytorium frontendu - dziennik_php_backend"
			target="_blank"
			class="menu-item gh"
			id="frontend"
		>
			<i class="fab fa-github"></i>
			<p>frontend</p>
			<i class="fas fa-external-link-alt"></i>
		</a>
		<a
			href="https://github.com/JakubKoralewski/dziennik_php_backend"
			title="GitHub repozytorium backendu - dziennik_php_backend"
			target="_blank"
			class="menu-item gh"
			id="backend"
		>
			<i class="fab fa-github"></i>
			<p>backend</p>
			<i class="fas fa-external-link-alt"></i>
		</a>
		<a
			href="https://github.com/JakubKoralewski"
			title="Profil GitHub - Jakub Koralewski"
			target="_blank"
			class="menu-item gh"
			id="gh-profile"
		>
			<i class="fab fa-github"></i>
			<p>profil</p>
			<i class="fas fa-external-link-alt"></i>
		</a>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { mapState, mapMutations } from 'vuex';

	interface IData {
		elements: {
			[name: string]: HTMLElement;
		};
	}

	/** Below this value, by default, the sidebar will be hidden.  */
	const MAX_SCREEN_WIDTH_FOR_DEFAULT_SIDEBAR = 800;

	export default Vue.extend({
		name: 'SideBar',
		data() {
			return {
				elements: {},
			} as IData;
		},
		computed: {
			...mapState(['sideBarVisible']),
		},
		beforeMount() {
			if (screen.width < MAX_SCREEN_WIDTH_FOR_DEFAULT_SIDEBAR) {
				this.sideBarVisibilityChange(false);
			}
		},
		mounted() {
			const elements = {
				SideBar: document.querySelector('div.nav'),
			};
			this.elements = Object.assign(this.elements, elements);
		},
		methods: {
			...mapMutations(['sideBarVisibilityChange']),
			SideBarToggle(el: HTMLElement, event: Event) {
				this.sideBarVisibilityChange(!this.sideBarVisible);
			},
			showArrow(el: HTMLElement) {
				console.log(el);
			},
		},
	});
</script>

<style scoped lang="scss">
	.nav {
		// The whole navigation div
		display: flex;
		flex-direction: column;
		padding: 2rem;
		padding-top: 1rem;
		font-weight: 800;
		text-transform: uppercase;
		transition: all 0.2s ease-out;
		transition-property: width, padding;

		&.SideBar-hidden {
			width: 0px !important;
			padding-left: 0 !important;
			padding-right: 0 !important;
			transition: all 0.5s ease-in;
			/* overflow: hidden; */

			.menu-item {
				transition: opacity 0.1s ease-out;
				opacity: 0;
			}
		}

		a:not(:nth-child(1)) {
			margin-top: 1rem;
		}

		#hide {
			// Div containing checkmark icon
			margin-left: auto;
			cursor: pointer;
			position: relative;
			margin-bottom: 2rem;

			i {
				// Checkmark icon
				position: absolute;
				left: 0;
				padding: 5px;

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
				transition-property: left, transform, opacity;

				&.SideBar-hidden {
					position: absolute;
					left: calc(0.5rem + 1vmin);
					transform: rotate(180deg);
					opacity: 0.4;

					&:hover {
						transform: rotate(180deg) translateX(-5px);
					}
				}
			}
		}

		.menu-item {
			display: flex;
			text-align: center;
			justify-content: center;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
			padding: 1rem;

			width: 100%;
			border-radius: 0.2rem;
			height: calc(2rem + 5vmin);

			cursor: pointer;
			transition: color 100ms ease-out;
			font-size: 1.1rem;
			background-color: darken($main-color, 3%);
			text-decoration: none;
			color: inherit;

			&.gh {
				display: flex;
				justify-content: space-evenly;
				p {
					font-size: 0.9rem;
					font-weight: 400;
				}
				.fa-github {
					font-size: 1.2rem;
				}
				.fa-external-link-alt {
					font-size: 0.5rem;
					opacity: 0.5;
				}
			}

			&:hover {
				color: darken($main-color, 50%);
			}
		}
	}
</style>
