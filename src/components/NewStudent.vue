<template>
	<div class="new-student student">
		<div id="header">
			<div id="name">
				<input
					type="text"
					id="imie"
					:placeholder="$t('student.first-name')"
					v-model="newStudent.imie"
					autofocus
					spellcheck="false"
					tabindex="1"
				>
				<input
					type="text"
					id="nazwisko"
					:placeholder="$t('student.last-name')"
					v-model="newStudent.nazwisko"
					spellcheck="false"
					tabindex="2"
				>
			</div>
		</div>
		<div id="content">
			<div id="klasa">
				<p>{{$t('student.class')}}:</p>
				<span class="info">
					<input
						type="text"
						id="klasa"
						placeholder="3d"
						v-model="newStudent.klasa"
						spellcheck="false"
						tabindex="3"
					>
				</span>
			</div>
			<div id="telefon">
				<p>{{$t('student.phone-number')}}:</p>
				<span class="info">
					<input
						type="text"
						id="telefon"
						placeholder="666666666"
						v-model="newStudent.telefon"
						spellcheck="false"
						tabindex="4"
					>
				</span>
			</div>
			<div id="checkmark" @click="addUser">
				<button>
					<i class="fas fa-check"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
	import {
		IStudent,
		INewStudent,
		IStudents,
		IStudentsPropertiesRequiringValidation,
	} from '@/interfaces';
	import { mapActions } from 'vuex';
	import PropertiesValid from '@/mixins/PropertiesValid';

	interface INewStudentThis {
		propertiesValid(
			student: IStudentsPropertiesRequiringValidation,
			shouldCreateAlerts?: boolean
		): boolean;
	}
	@Component({
		name: 'NewStudent',
		methods: mapActions(['addStudent']),
	})
	export default class NewStudent extends Mixins(PropertiesValid) {
		newStudent: INewStudent = {
			imie: '',
			nazwisko: '',
			klasa: '',
			telefon: '',
		};
		allPropertiesValid: boolean = false;

		/* Actions */
		addStudent: (student: INewStudent) => IStudents;

		@Watch('newStudent', { deep: true })
		onNewStudentChange(): void {
			this.allPropertiesValid = this.propertiesValid(this.newStudent, false);
			const checkmarkColor = this.allPropertiesValid
				? 'rgb(12, 237, 0)'
				: 'red';
			this.$el.setAttribute(
				'style',
				`--new-student-checkmark-color: ${checkmarkColor}`
			);
		}

		async addUser() {
			const allPropertiesValid = ((this as any) as INewStudentThis).propertiesValid(
				this.newStudent
			);
			if (!allPropertiesValid) {
				return;
			}
			this.$emit('newStudentAdded');
			const response = await this.addStudent(this.newStudent);
		}
	}
</script>

<style lang="scss">
	@mixin new-student-padding {
		padding: 0 2rem;
	}
	div.new-student.student {
		z-index: 101;
		position: absolute;
		width: calc(10rem + 40vw);
		height: calc(10rem + 30vh);
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		--new-student-checkmark-color: black;

		input {
			width: calc(30% + 10vmin);
			cursor: text !important;
			font-size: 1.2rem;
			padding: 0.3rem;
			border-radius: 0.1rem;
			border-width: 2px;
			border-style: solid;
			border-color: black;
		}

		#header {
			height: 8rem;
			#name {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				justify-content: space-evenly;
			}
			@include new-student-padding();
		}

		#content {
			height: 100%;
			display: flex;
			flex-direction: column;
			@include new-student-padding();
			padding-top: 2rem;

			#klasa,
			div#telefon {
				align-items: center;
				justify-content: space-around;
				width: calc(50% + 2rem);
			}

			div#telefon {
				margin-top: calc(1rem + 1vh);
			}

			#checkmark {
				margin: 2rem;
				margin-top: auto;
				margin-left: auto;

				button {
					transition: color 200ms ease-out;
					color: var(--new-student-checkmark-color);
					background-color: transparent;
					border-style: unset;
					cursor: pointer;
				}

				/* Checkmark font-awesome icon */
				i {
					font-size: 3rem;
				}
			}
		}
	}
</style>
