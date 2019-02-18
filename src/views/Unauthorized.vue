<!-- Will have a prompt to Login. -->
<!-- Will not have a navbar. -->

<template>
	<div class="unauthorized">
		unauthorized
		<login prop-logo="logo.png" name="Harwart"></login>
	</div>
</template>

<script>
	import Login from '@/components/Login.vue';

	export default {
		components: {
			Login,
		},
	};
</script>

<style lang="scss" scoped>
</style>
