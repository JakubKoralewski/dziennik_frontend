<template>
	<div class="authorized">
		<Nav></Nav>
		<!-- Will have a Nav.vue -->
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Nav from '@/components/Nav.vue';
	/*
		import Search from '@/components/Search.vue';
		import Student from '@/components/Student.vue';
	*/
	export default Vue.extend({
		name: 'Authorized',
		components: {
			Nav,
			/* Search,
			Student, */
		},
	});
</script>
