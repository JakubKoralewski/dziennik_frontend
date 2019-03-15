<!-- Will have a prompt to Login. -->
<!-- Will not have a SideBar. -->

<template>
	<div class="unauthorized">
		<Login class="login" prop-logo="logo.png" name="Harwart"/>
		<div id="cover"/>
		<canvas id="canvas" class="animate"></canvas>
		<img class="bg noselect animate" src="hogwarts.jpg" unselectable="on" draggable="false">
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
				titleTemplate: `%s - ${(this as any).$t('login.CTA')}!`,
				htmlAttrs: {
					lang: this.$i18n.locale,
				},
			};
		},
		beforeCreate() {
			document.documentElement.classList.add('html-unauthorized');
		},
		destroyed() {
			document.documentElement.classList.remove('html-unauthorized');
		},
		mounted() {
			// https://codepen.io/ruigewaard/pen/JHDdF
			const canvas: HTMLCanvasElement = document.querySelector('#canvas');
			const img: HTMLImageElement = document.querySelector('img');

			if (canvas.getContext) {
				const ctx = canvas.getContext('2d');
				ctx.globalAlpha = 0.4;
				const w = canvas.width;
				const h = canvas.height;
				ctx.strokeStyle = 'rgba(174,194,224,0.5)';
				ctx.lineWidth = 500 / window.innerWidth;
				ctx.lineCap = 'round';

				const particles: any[] = [];
				const maxParts = 50;
				const ySpeed = 2;
				const xSpeed = 1;
				for (let a = 0; a < maxParts; a++) {
					particles.push({
						x: Math.random() * w,
						y: Math.random() * h,
						l: Math.random() * 1,
						xs: -4 + Math.random() * xSpeed + 2,
						ys: Math.random() * ySpeed,
					});
				}

				function draw() {
					ctx.clearRect(0, 0, w, h);
					for (const p of particles) {
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
						ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
						ctx.stroke();
					}
					move(particles);
				}

				function move(prtcls: any[]) {
					for (const p of prtcls) {
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
		width: 1920px;
		height: 1080px;
		z-index: -2;
		position: absolute;
	}

	div#cover {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: -4;
	}

	img.bg {
		position: absolute;
		z-index: -3;
		// margin-left: 50%;
		// transform: translateX(-50%);
		// left: 50%;
		// top: 50%;
		pointer-events: none;
		opacity: 0.3;
	}

	.animate {
		animation-name: slowZoom;
		animation-duration: 40s;
		animation-iteration-count: infinite;
		animation-direction: alternate-reverse;
		animation-timing-function: ease-in-out;
		animation-fill-mode: both;
		position: absolute;
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
		user-select: none;
		-webkit-user-drag: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}

	.login {
		background-color: white;
		width: calc(20vw + 15rem);
		height: 360px;
		margin-top: -10vmin;
	}
</style>
