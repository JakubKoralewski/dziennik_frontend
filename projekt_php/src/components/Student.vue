<template>
	<div class="student"></div>
</template>

<script>
	export default {
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
	};
</script>

<style scoped lang="scss">
</style>
