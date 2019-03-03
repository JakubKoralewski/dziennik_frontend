<template>
	<div class="add-button" @click="$emit('addButtonClick')">
		<i class="fas fa-user-plus"></i>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'AddButton',
	});
</script>

<style scoped lang="scss">
	.add-button {
		border-radius: 100%;
		background-color: lighten(red, 10%);
		padding: 2rem;
		color: white;
		position: fixed;
		right: calc(1rem + 5vmin);
		bottom: calc(1rem + 5vmin);
		cursor: pointer;
		z-index: 100;
		transition: all 100ms ease-in;
		box-shadow: 7px 6px 21px 0px rgba(0, 0, 0, 0);

		font-size: 2rem;
		&:hover {
			transition: transform 100ms ease-in, box-shadow 300ms ease-out;
			transform: scale(1.01);
			box-shadow: 7px 6px 21px 0px rgba(0, 0, 0, 0.4);
		}
		&:active {
			transform: scale(0.95);
			transition-duration: 50ms;
		}
	}
</style>
