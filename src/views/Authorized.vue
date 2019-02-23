<template>
	<div class="authorized">
		<NavBar />
		<!-- Will have a Nav.vue -->
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import NavBar from '@/components/NavBar.vue';
	/*
		import Search from '@/components/Search.vue';
		import Student from '@/components/Student.vue';
	*/
	export default Vue.extend({
		name: 'Authorized',
		components: {
			NavBar,
			/* Search,
			Student, */
		},
	});
</script>



<style lang="scss" scoped>



</style>

