<!-- Will have a prompt to Login. -->
<!-- Will not have a navbar. -->

<template>
	<div class="unauthorized">
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

<style lang="scss" scoped>
	.unauthorized {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.login {
		width: calc(100vw - 61vw);
		height: 40vh;
		margin-top: calc(vw/vh);
	}
</style>
