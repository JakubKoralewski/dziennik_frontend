<template>
	<div class="nav-title">
		{{ title }}
		<!-- <Search></Search> -->
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'NavTitle',
		props: {
			title: {
				default: 'Uczniowie',
			},
		},
	});
</script>

<style scoped lang="scss">
	.nav-title {
		display: flex;
		flex-direction: column;
		padding: 2rem 10rem;
		font-weight: 400;
		font-size: 2rem;
	}
</style>
