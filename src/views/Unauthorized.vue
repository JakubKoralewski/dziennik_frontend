<!-- Will have a prompt to Login. -->
<!-- Will not have a navbar. -->

<template>
	<div class="unauthorized">
		<div id="cover"/>
		<img class="bg noselect" src="@/assets/hogwarts.jpg" unselectable="on" draggable="false">
		<login class="login" prop-logo="logo.png" name="Harwart"/>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Login from '@/components/Login.vue';

	export default Vue.extend({
		components: {
			Login,
		},
	});
</script>

<style lang="scss">
	// body {
	// 	overflow: hidden;
	// }
</style>

<style lang="scss" scoped>
	.unauthorized {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	div#cover {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: -2;
	}

	img.bg {
		position: absolute;
		z-index: -1;
		/* margin-left: 50%;
																																									transform: translateX(-50%); */
		/* left: 50%;
																																		top: 50%; */
		pointer-events: none;
		opacity: 0.3;

		animation-name: slowZoom;
		animation-duration: 40s;
		animation-iteration-count: infinite;
		animation-direction: alternate-reverse;
		animation-timing-function: ease-in-out;
		animation-fill-mode: both;
		clip: rect(0px,60px,200px,0px);
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
		width: calc(100vw - 61vw);
		height: 360px;
		margin-top: -20vh;
	}
</style>
