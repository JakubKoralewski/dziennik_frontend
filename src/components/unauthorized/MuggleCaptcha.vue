<template>
	<!-- What it's supposed to look like: https://www.google.com/recaptcha/api2/demo -->
	<div class="muggle-captcha">
		<div class="g-recaptcha" :data-sitekey="googleSiteKey"></div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'MuggleCaptcha',
		props: {
			message: {
				default: 'Nie jestem mugolem',
			},
		},
		data() {
			return {
				googleSiteKey: '6LegZZQUAAAAAC3jJvQncCC5U2t64ioYtyR-FmOT',
			};
		},
		mounted() {
			const googleScriptAPI: HTMLScriptElement = document.createElement(
				'script'
			);
			/* googleScriptAPI.src = `https://www.google.com/recaptcha/api.js?render=${
							this.googleSiteKey
						}`; */
			googleScriptAPI.src = 'https://www.google.com/recaptcha/api.js';
			document.documentElement.appendChild(googleScriptAPI);
		},
	});
</script>

<style scoped lang="scss">
	.muggle-captcha {
		border-radius: 3px;
		box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
		background: #f9f9f9;
		color: #000;
		border: 1px solid #d3d3d3;
		height: 74px;
		width: 300px;

		display: flex;

		#message {
			font-size: 0.8rem;
		}
	}
</style>
