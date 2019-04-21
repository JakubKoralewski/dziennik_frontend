<template>
	<div 
	class="add-button"
	@click="$emit('addButtonClick')"
	:title="$t('student.add')"
	:aria-label="$t('student.add')"
	role="button"
	>
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
		padding: calc(1rem + 2vmin);
		color: white;
		position: fixed;
		right: calc(0.1rem + 5vw);
		bottom: calc(1rem + 5vmin);
		cursor: pointer;
		z-index: 5;
		transition: all 100ms ease-in;
		box-shadow: 7px 6px 21px 0px rgba(0, 0, 0, 0);

		font-size: calc(1.1rem + 3vmin);

		&.blur-visible {
			animation-name: rotateAddButton;
			animation-duration: 500ms;
			animation-timing-function: ease-in;
			color: black !important;
			background-color: white !important;
		}

		&.blur-visible,
		&:hover {
			box-shadow: 7px 6px 21px 0px rgba(0, 0, 0, 0.4);
		}

		&:hover {
			transition: transform 100ms ease-in, box-shadow 300ms ease-out;
			transform: scale(1.01);
		}
		&:active {
			transform: scale(0.95);
			transition-duration: 50ms;
		}
	}

	@keyframes rotateAddButton {
		0% {
			transform: rotate3d(0, 0, 0, 0deg) !important;
		}
		50% {
			transform: rotate3d(0, -1, 0, 180deg) !important;
		}
		100% {
			transform: rotate3d(0, 0, 0, 0deg) !important;
		}
	}
</style>
