<template>
	<div class="student">
		student
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'Student',
		props: {
			firstName: {
				type: String,
				required: true,
			},
			lastNname: {
				type: String,
				required: true,
			},
			class: {
				type: String,
				required: true,
			},
			phoneNumber: {
				type: Number,
				required: true,
			},
		},
	});
</script>

<style scoped lang="scss">
</style>
