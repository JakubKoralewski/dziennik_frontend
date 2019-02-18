<template>
	<div class="authorized">
		<!-- Will have a Nav.vue -->
	</div>
</template>

<script>
	// @ is an alias to /src
	import Nav from '@/components/Nav.vue';
	import Search from '@/components/Search.vue';
	import Student from '@/components/Student.vue';

	export default {
		name: 'Authorized',
		components: {
			Search,
			Nav,
			Student,
		},
	};
</script>
