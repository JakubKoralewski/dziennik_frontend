<template>
	<div id="authorized">
		<NavBar id="nav-bar"/>
		<AddButton @click="addButtonClick"/>
		<div id="content">
			<NavTitle id="nav-title"/>
			<div id="students" v-if="students">
				<div
					class="student"
					v-for="student of students"
					:key="student.id"
					:class="{'invisible': !student.visible}"
				>
					<div id="header">
						<div id="name">{{ student.imie }} {{ student.nazwisko }}</div>
						<div id="tools">
							<i class="fas fa-edit"></i>
							<i class="fas fa-trash-alt"></i>
						</div>
					</div>
					<div id="content">
						<div id="klasa">
							Klasa:
							<span class="info">{{student.klasa}}</span>
						</div>
						<div id="telefon">
							Telefon:
							<span class="info">{{student.telefon}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import NavBar from '@/components/NavBar.vue';
	import NavTitle from '@/components/NavTitle.vue';
	import AddButton from '@/components/AddButton.vue';

	import { mapGetters, mapActions, mapState, Computed } from 'vuex';
	import { IStudent, IStudents } from '@/interfaces';

	interface IAuthorizedData {
		students: IStudent[];
		studentsLoaded: boolean;
		loadStudents: Promise<any>;
	}

	interface IAuthorizedMethods {
		loadStudents(): void;
		addButtonClick(): void;
	}
	interface IAuthorizedComputed {
		students: IStudents;
		visibleStudents: IStudent[];
	}

	// import Search from '@/components/Search.vue';
	// import Student from '@/components/Student.vue';

	export default Vue.extend({
		name: 'Authorized',
		components: {
			NavBar,
			NavTitle,
			AddButton,
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
		methods: {
			...mapActions(['loadStudents']),
			addButtonClick: function() {
				return;
			},
		} as IAuthorizedMethods,
		async mounted() {
			await this.loadStudents();
		},
	});
</script>

<style lang="scss">
	// body {
	// 	overflow-x: hidden;
	// 	overflow-y: scroll;
	// }
</style>

<style lang="scss" scoped>
	@mixin nav-shadow($size: 1px) {
		box-shadow: $size $size 72px -14px rgba(0, 0, 0, 0.1);
	}
	@mixin nav-border($size) {
		border: $size solid darken($main-color, 20%);
	}

	@import '@/scss/wiggle.scss';

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
			#students {
				$left-padding: 3rem;
				$top-padding: 2rem;
				padding: $top-padding 0rem 0rem $left-padding;
				// height: 100%; // makes white footer
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				align-content: flex-start;
				box-sizing: border-box;

				flex-direction: row;
				flex-wrap: wrap;

				.student {
					overflow: hidden;
					/* width: 25%; */
					// height: 25%; // makes elements unnaturally shrink when height very small

					// flex-basis: 25%;
					max-width: calc(61.8% + 6.18rem); // golden ratio

					border-radius: 1rem;
					$student-bg-color: lighten($main-color, 2%);
					background-color: $student-bg-color;
					flex-grow: 1;
					margin-right: $left-padding;
					margin-bottom: $top-padding;
					@include nav-shadow;
					display: flex;
					flex-direction: column;
					transition: opacity 0.25s ease-in-out;

					&.invisible {
						opacity: 0;
						// display: none;
					}

					#content {
						box-sizing: border-box;
						padding: 1rem;
						font-weight: 300;

						.info {
							font-weight: 400;
						}
					}

					#header {
						display: flex;
						flex-direction: row;
						align-items: center;
						width: auto;
						padding: calc(0.5rem + 1vh) calc(0.5rem + 1vw);
						background-color: darken($student-bg-color, 2%);
						// background-color: lightblue;
						// border-bottom-right-radius: 0.5rem;
						// border-bottom-left-radius: 0.5rem;
						border-style: solid;
						border-width: 0px;
						border-bottom-width: 1px;
						border-color: transparentize(black, 0.9);

						// height: calc(1rem + 1vh);
						// height: 50rem;

						#name {
							text-align: center;
							line-height: 100%;
							height: 100%;
							font-weight: 500;
							word-break: break-word;
						}

						#tools {
							margin-left: auto;
							// background-color: darken($main-color, 2%);
							padding: 0.1rem;
							border-radius: 0.1rem;
							i {
								margin-left: 1vw;
								cursor: pointer;
								transition: all 0.25s ease-in-out;
								transition-property: color, transform;
								transform-origin: center center;

								&:hover {
									animation-name: wiggle;
									animation-duration: 1000ms;
									animation-iteration-count: 1;
									animation-timing-function: ease-out;
									&.fa-edit {
										color: lighten(blue, 20%);
									}
									&.fa-trash-alt {
										color: lighten(red, 20%);
									}
								}

								&:active {
									transition: font-size 100ms ease-in;
									font-size: 1.1rem;
								}
							}
						}
					}

					// &:nth-child(even) {
					// 	background-color: darken($main-color, 1%);
					// }
					// &:nth-child(odd) {
					// 	background-color: lighten($main-color, 1%);
					// }
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
			// height: 100vh; // with this too short
			order: 0;
		}
		#nav-title {
			@include nav-shadow(2px);
			@include nav-border(1px);

			border-width: 0px;
			border-bottom-width: 1px;

			background-color: lighten($main-color, 2%);

			height: calc(1vmin + 2rem);
		}
	}
</style>

