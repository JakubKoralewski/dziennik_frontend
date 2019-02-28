<template>
	<div class="authorized">
		<NavBar class="nav-bar"/>
		<NavTitle class="nav-title"/>
		<div id="content">
			<div id="wrapper">
				<div class="student" v-for="student in students" :key="student.id">
					{{ student.firstName }} {{student.lastName}} 
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import NavBar from '@/components/NavBar.vue';
	import NavTitle from '@/components/NavTitle.vue';

	// import Search from '@/components/Search.vue';
	// import Student from '@/components/Student.vue';

	export default Vue.extend({
		name: 'Authorized',
		components: {
			NavBar,
			NavTitle,
			// Search,
			// Student,
		},
		computed: {
			students: function() {
				return this.$store.state.students;
			}
		}
	});
</script>

<style lang="scss" scoped>
	@mixin nav-shadow($size) {
		box-shadow: $size $size 72px -14px rgba(0, 0, 0, 0.1);
	}
	@mixin nav-border($size) {
		border: $size solid darken($main-color, 20%);
	}

	.authorized {
		display: flex;
		flex-direction: row;
		background-color: $main-color;

		.nav-bar {
			@include nav-shadow(1px);
			@include nav-border(1px);
			border-width: 0px;
			border-right-width: 1px;
			background-color: lighten($main-color, 2%);

			width: calc(3rem + 10vw);
			height: 100vh;
		}
		.nav-title {
			@include nav-shadow(2px);
			@include nav-border(1px);

			border-width: 0px;
			border-bottom-width: 1px;

			background-color: lighten($main-color, 2%);

			width: 100vw;
			height: calc(1vmin + 2rem);
		}
	}
</style>

