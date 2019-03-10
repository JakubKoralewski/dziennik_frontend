<!-- Will have a prompt to Login. -->
<!-- Will not have a SideBar. -->

<template>
	<div class="unauthorized">
		<div id="cover"/>
		<img class="bg noselect" src="hogwarts.jpg" unselectable="on" draggable="false">
		<Login class="login" prop-logo="logo.png" name="Harwart"/>
		<canvas id="canvas"></canvas>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Login from '@/components/unauthorized/Login.vue';

	export default Vue.extend({
		components: {
			Login,
		},
		metaInfo() {
			return {
				title: (this as any).$t('title'),
				titleTemplate: `%s - ${(this as any).$t('login.loginCTA')}!`,
				htmlAttrs: {
					lang: this.$i18n.locale,
				},
			};
		},
		mounted() {
			// https://codepen.io/ruigewaard/pen/JHDdF
			const canvas: HTMLCanvasElement = document.querySelector('#canvas');
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			if (canvas.getContext) {
				const ctx = canvas.getContext('2d');
				ctx.globalAlpha = 0.5;
				const w = canvas.width;
				const h = canvas.height;
				ctx.strokeStyle = 'rgba(174,194,224,0.5)';
				ctx.lineWidth = 1;
				ctx.lineCap = 'round';

				const init: object[] = [];
				const maxParts = 100;
				for (let a = 0; a < maxParts; a++) {
					init.push({
						x: Math.random() * w,
						y: Math.random() * h,
						l: Math.random() * 1,
						xs: -4 + Math.random() * 4 + 2,
						ys: Math.random() * 10 + 10,
					});
				}

				const particles: object[] = [];
				for (let b = 0; b < maxParts; b++) {
					particles[b] = init[b];
				}

				function draw() {
					ctx.clearRect(0, 0, w, h);
					for (let c = 0; c < particles.length; c++) {
						const p: any = particles[c];
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
						ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
						ctx.stroke();
					}
					move();
				}

				function move() {
					for (let b = 0; b < particles.length; b++) {
						const p: any = particles[b];
						p.x += p.xs;
						p.y += p.ys;
						if (p.x > w || p.y > h) {
							p.x = Math.random() * w;
							p.y = -20;
						}
					}
				}

				setInterval(draw, 30);
			}
		},
	});
</script>

<style lang="scss" scoped>
	.unauthorized {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative; // Fixes img not getting clipped
	}

	#canvas {
		width: 100vw;
		height: 100vh;
		z-index: -2;
		position: absolute;
		left: 0;
		top: 0;
	}

	div#cover {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: -3;
	}

	img.bg {
		position: absolute;
		z-index: -1;
		// margin-left: 50%;
		// transform: translateX(-50%);
		// left: 50%;
		// top: 50%;
		pointer-events: none;
		opacity: 0.3;

		animation-name: slowZoom;
		animation-duration: 40s;
		animation-iteration-count: infinite;
		animation-direction: alternate-reverse;
		animation-timing-function: ease-in-out;
		animation-fill-mode: both;
		/* clip: rect(0px, 100vw, 100vh, 0px); */
		/* animation-delay: 2s; */
	}

	@keyframes slowZoom {
		0% {
			transform: scale(0.8) translateX(0%) translateY(0);
		}
		100% {
			transform: scale(1.2) translateX(0%) translateY(0%);
		}
	}

	.noselect {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		user-drag: none;
		user-select: none;
		-webkit-user-drag: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}

	.login {
		background-color: white;
		width: calc(20vw + 15rem);
		height: 360px;
		margin-top: -10vh;
	}
</style>
