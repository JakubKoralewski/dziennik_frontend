<template>
	<div class="nav" :class="{'SideBar-hidden': !sideBarVisible}">
		<a id="hide">
			<i
				class="fas fa-arrow-left"
				@click="sideBarToggle()"
				:class="{'SideBar-hidden': !sideBarVisible}"
			></i>
		</a>
		<div class="scrollable">
			<a id="o-mnie" class="menu-item">
				<p>Lorem</p>
			</a>
			<a id="szkola" class="menu-item">
				<p>Ipsum</p>
			</a>
			<a
				href="https://github.com/JakubKoralewski/dziennik_php_frontend"
				:title="$t('github.frontend.info')"
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
				title="$t('github.backend.info')"
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
				:title="$t('github.profile.info')"
				target="_blank"
				class="menu-item gh"
				id="gh-profile"
			>
				<i class="fab fa-github"></i>
				<p>{{ $t('sidebar.profile')}}</p>
				<i class="fas fa-external-link-alt"></i>
			</a>
			<div class="languages">
				<div
					class="language"
					v-for="(lang, i) in langs"
					:key="i"
					@click="$i18n.locale = lang"
					:class="{'current-active': $i18n.locale == lang}"
				>{{lang}}</div>
			</div>
		</div>
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
				langs: this.$i18n.availableLocales,
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
			sideBarToggle(el: HTMLElement, event: Event) {
				this.sideBarVisibilityChange(!this.sideBarVisible);
				this.$emit('sideBarToggle', this.sideBarVisible);
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
		transition-property: transform, padding;
		will-change: transform, padding;
		position: fixed;
		height: 100vh;
		z-index: 200;

		.scrollable {
			overflow-y: auto;
			padding-bottom: 4rem;

			& > * {
				margin-top: 1rem;
			}
		}

		&.SideBar-hidden {
			overflow-y: visible;
			padding-left: 0 !important;
			padding-right: 0 !important;
			transition: all 0.5s ease-in;
			border-right-width: 0 !important;
			transform: translateX(-100%);

			.menu-item,
			.languages {
				transition: opacity 0.1s ease-out;
				opacity: 0;
			}
		}

		/* Hide arrow */
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

		.languages {
			display: flex;
			text-align: center;
			justify-content: space-evenly;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
			padding: 2vmin;

			width: 100%;
			border-radius: 0.2rem;
			height: calc(2rem + 5vmin);

			cursor: pointer;
			transition: color 100ms ease-out;
			font-size: 1.1rem;
			background-color: darken($main-color, 3%);
			text-decoration: none;
			color: inherit;

			.language {
				display: flex;
				flex-direction: column;

				&:after {
					content: '';
					width: 100%;
					height: 2px;
					background-color: gray;
					transform: scaleX(0);
					will-change: transform;
					transition: transform 250ms ease-in-out;
				}
				&.current-active {
					&:after {
						background-color: red;
						transform: scaleX(1);
					}
				}

				&:hover {
					color: red;
					&.current-active {
						color: rgb(139, 134, 134);
						&:after {
							background-color: red !important;
						}
					}

					&:after {
						transform: scaleX(1);
					}
				}
			}
		}

		.menu-item {
			display: flex;
			text-align: center;
			justify-content: space-evenly;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
			padding: 2vmin;

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
