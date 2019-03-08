<template>
	<div id="authorized">
		<SideBar id="nav-bar"/>
		<AddButton @addButtonClick="addButtonClick()"/>
		<div id="content">
			<NavTitle id="nav-title"/>
			<NewStudent v-if="showNewStudentDialog" @newStudentAdded="showNewStudentDialog=false"/>
			<div id="students" v-if="students">
				<Student
					v-for="student of students"
					:key="student.id"
					:class="{'invisible': !student.visible}"
					:student="student"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import SideBar from '@/components/SideBar.vue';
	import NavTitle from '@/components/NavTitle.vue';
	import Student from '@/components/Student.vue';
	import NewStudent from '@/components/NewStudent.vue';
	import AddButton from '@/components/AddButton.vue';

	import { mapGetters, mapActions, mapState, Computed } from 'vuex';
	import { IStudent, IStudents } from '@/interfaces';

	interface IAuthorizedData {
		students: IStudent[];
		studentsLoaded: boolean;
		loadStudents: Promise<any>;
	}

	interface IAuthorizedMethods {
		showNewStudentDialog: boolean;
		loadStudents(): void;
		addButtonClick(): void;
	}

	export default Vue.extend({
		name: 'Authorized',
		components: {
			SideBar,
			NavTitle,
			AddButton,
			Student,
			NewStudent,
		},
		data() {
			return {
				showNewStudentDialog: false,
			};
		},
		computed: {
			...mapState(['students']),
			visibleStudents: function(): IStudent[] {
				// FIXME: (this as any).students is from mapState
				const students: IStudent[] = Object.values((this as any).students);
				console.groupCollapsed('visibleStudents');
				console.log('students: ', students);
				console.groupEnd();
				return students.filter((student: IStudent) => {
					return student.visible;
				});
			},
		},
		beforeMount() {
			console.log(screen.width);
		},
		methods: {
			...mapActions(['loadStudents']),
			addButtonClick() {
				this.showNewStudentDialog = !this.showNewStudentDialog;
			},
		} as IAuthorizedMethods,
		async mounted() {
			await this.loadStudents();
		},
	});
</script>

<style lang="scss" scoped>
	@import '@/scss/_mixins.scss';

	@import '@/scss/wiggle.scss';

	#authorized {
		display: flex;
		flex-direction: row;
		flex: auto;
		// flex-flow: wrap;
		background-color: $main-color;

		$SideBar-width: calc(3rem + 10vw);

		#content {
			height: 100%;
			width: 100%;
			#students {
				padding: $students-top-padding 0rem 0rem $students-left-padding;
				// height: 100%; // makes white footer
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				align-content: flex-start;
				box-sizing: border-box;

				flex-direction: row;
				flex-wrap: wrap;
			}
		}

		#nav-bar {
			@include nav-shadow(1px);
			@include nav-border(1px);
			border-width: 0px;
			border-right-width: 1px;
			background-color: lighten($main-color, 2%);

			width: $SideBar-width;
			// flex-basis: $SideBar-width;
			// height: 100vh; // with this too short
			order: 0;
		}
		#nav-title {
			@include nav-shadow(2px);
			@include nav-border(1px);

			border-width: 0px;
			border-bottom-width: 1px;

			background-color: lighten($main-color, 2%);

			// height: calc(1vmin + 2rem);
		}
	}
</style>

