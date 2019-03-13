<template>
	<div id="authorized">
		<NewStudent
			v-show="showNewStudentDialog"
			@newStudentAdded="showNewStudentDialog=false"
			id="new-student"
		/>
		<AddButton
			@addButtonClick="addButtonClick()"
			:class="{'blur-visible': showNewStudentDialog}"
			id="add-button"
		/>
		<div
			:class="{'visible': showNewStudentDialog, 'actually-hidden': coverActuallyHidden}"
			id="cover"
			@click="coverClick()"
		/>
		<div class="blur-container" :class="{'blur-visible': showNewStudentDialog}">
			<SideBar id="nav-bar" @sideBarToggle="sideBarToggle"/>

			<div id="content">
				<NavTitle id="nav-title"/>

				<div id="students" v-if="students">
					<Student
						v-for="student of students"
						:key="student.id"
						:class="{'invisible': !student.visible}"
						:initial-student="student"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import SideBar from '@/components/SideBar.vue';
	import NavTitle from '@/components/NavTitle.vue';
	// @ts-ignore https://github.com/vuejs/vue-cli/issues/1104
	import Student from '@/components/Student.vue';
	import NewStudent from '@/components/NewStudent.vue';
	import AddButton from '@/components/AddButton.vue';
	import touchDetection from '@/mixins/touchDetection';

	import { mapGetters, mapActions, mapState, Computed } from 'vuex';
	import { IStudent, IStudents } from '@/interfaces';

	interface IAuthorizedData {
		showNewStudentDialog: boolean;
		coverActuallyHidden?: boolean;
	}

	interface IAuthorizedMethods {
		showNewStudentDialog: boolean;
		// loadStudents(): void;
		addButtonClick(): void;
		toggleNewStudentDialog(): void;
		coverClick(): void;
	}

	export default Vue.extend({
		name: 'Authorized',
		mixins: [touchDetection],
		components: {
			SideBar,
			NavTitle,
			AddButton,
			Student,
			NewStudent,
		},
		metaInfo() {
			return {
				title: (this as any).$t('title'),
				titleTemplate: `${(this as any).$t('studentsCTA')}!`,
				htmlAttrs: {
					lang: this.$i18n.locale,
				},
			};
		},
		data() {
			return {
				showNewStudentDialog: false,
				coverActuallyHidden: true,
				ADD_STUDENT_HASH_PATH: '',
			} as IAuthorizedData;
		},
		watch: {
			$route(to, from) {
				
				const currentRoute = this.$router.currentRoute;
				const newHash = currentRoute.hash;
				console.log(`currentRoute:`, currentRoute, `newHash: ${newHash}`);
				if (newHash === this.$t('hashes.addStudent')) {
					this.showNewStudentDialog = true;
				} else {
					this.showNewStudentDialog = false;
				}
			},
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
		created() {
			if (this.$route.hash === this.$t('hashes.addStudent')) {
				console.log('route hash is add-student-hash-path');
				this.toggleNewStudentDialog();
			}
		},
		beforeMount() {
			console.log(screen.width);
		},
		methods: {
			...mapActions(['loadStudents']),
			toggleNewStudentDialog() {
				if (this.showNewStudentDialog === false) {
					// this.$router.push({ name: 'Add Student' });
					/* Making the dialog appear */
					console.log(this.$t('hashes.addStudent'));
					history.pushState('', 'Dodaj ucznia', this.$t(
						'hashes.addStudent'
					) as string);
					this.coverActuallyHidden = false;
					/* If making NewStudentDialog appear show cover. */
				} else {
					/* Making the dialog disappear */
					console.log('Making the dialog disappear');
					this.$router.push(`/${this.$t('loggedIn')}`);
				}
				this.showNewStudentDialog = !this.showNewStudentDialog;
			},
			addButtonClick() {
				this.toggleNewStudentDialog();
				const firstNameElement: HTMLInputElement = document.querySelector(
					'.new-student input#imie'
				);
				console.log('focusing', firstNameElement);
				setTimeout(() => {
					firstNameElement.focus();
				}, 1);
			},
			coverClick() {
				console.log('coverClick');
				this.toggleNewStudentDialog();
				/* If making NewStudentDialog disappear set cover to disappear after timeout. */
				if (this.showNewStudentDialog === false) {
					setTimeout(() => {
						console.log('running setTimeout');
						this.coverActuallyHidden = true;
					}, 100);
				}
			},
			sideBarToggle(newState: boolean) {
				console.log('sideBarToggle(), newState: ', newState);
			},
		},
		async mounted() {
			await (this as any).loadStudents();
		},
	});
</script>

<style lang="scss" scoped>
	@import '@/scss/_mixins.scss';

	@import '@/scss/wiggle.scss';

	#authorized {
		$SideBar-width: calc(10rem + 10vw);

		.blur-container {
			width: 100%;
			height: 100%;
			background-color: $main-color;

			&.blur-visible:not(#add-button):not(#new-student) {
				filter: blur(1px);
			}
		}

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

		div#cover {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			opacity: 0;
			z-index: 10;
			pointer-events: none;
			background-color: black;
			transition: opacity 300ms;

			&.actually-hidden {
				visibility: hidden !important;
			}

			&.visible {
				visibility: visible;
				opacity: 0.5;
				pointer-events: all;
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

