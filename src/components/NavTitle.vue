<template>
	<div class="nav-title">
		{{ title }}
		<Search class="search"/>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Search from '@/components/Search.vue';

	export default Vue.extend({
		name: 'NavTitle',
		components: {
			Search,
		},
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
		flex-direction: row;
		align-items: center;
		padding: 2rem calc(2rem + 5vw);
		font-weight: 400;
		font-size: 2rem;
		// flex-wrap: wrap;
		justify-content: space-between;
		@media screen and (max-width: 600px) {
			flex-direction: column;
		}
	}
</style>
