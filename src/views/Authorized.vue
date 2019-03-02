<template>
	<div id="authorized">
		<NavBar id="nav-bar"/>
		<div id="content">
			<NavTitle id="nav-title"/>
			<div id="wrapper" v-if="studentsLoaded">
				<div
					class="student"
					v-for="student of Object.values(students)"
					:key="student.id"
				>{{ student.imie }} {{ student.nazwisko }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import NavBar from '@/components/NavBar.vue';
	import NavTitle from '@/components/NavTitle.vue';

	import { mapGetters } from 'vuex';

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
		data() {
			return {
				students: [],
				studentsLoaded: false,
			};
		},
		computed: {
			...mapGetters(['getStudents']),
		},
		async mounted() {
			this.getStudents.then((data: object[]) => {
				this.students = data;
				this.studentsLoaded = true;
				console.log('this.students:', this.students);
			});
		},
	});
</script>

<style lang="scss" scoped>
	@mixin nav-shadow($size) {
		box-shadow: $size $size 72px -14px rgba(0, 0, 0, 0.1);
	}
	@mixin nav-border($size) {
		border: $size solid darken($main-color, 20%);
	}

	#authorized {
		display: flex;
		flex-direction: row;
		flex: auto;
		// flex-flow: wrap;
		background-color: $main-color;

		$navbar-width: calc(3rem + 10vw);

		#content {
			height: 100%;
			width: 100%;
			#wrapper {
				height: 100%;
				.student {
					// Single student HTMLDivElement
				}
			}
		}

		#nav-bar {
			@include nav-shadow(1px);
			@include nav-border(1px);
			border-width: 0px;
			border-right-width: 1px;
			background-color: lighten($main-color, 2%);

			width: $navbar-width;
			// flex-basis: $navbar-width;
			height: 100vh;
			order: 0;
		}
		#nav-title {
			@include nav-shadow(2px);
			@include nav-border(1px);

			border-width: 0px;
			border-bottom-width: 1px;

			background-color: lighten($main-color, 2%);

			width: 100%;
			height: calc(1vmin + 2rem);
		}
	}
</style>

