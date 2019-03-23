<template>
	<div class="new-student student">
		<div id="header">
			<div id="name">
				<input
					type="text"
					id="imie"
					:placeholder="$t('student.first-name')"
					:aria-label="$t('student.first-name')"
					@keyup.enter="addUser"
					v-model="newStudent.imie"
					autofocus
					spellcheck="false"
					onfocus="this.select()"
					tabindex="1"
				>
				<input
					type="text"
					id="nazwisko"
					@keyup.enter="addUser"
					:placeholder="$t('student.last-name')"
					:aria-label="$t('student.last-name')"
					v-model="newStudent.nazwisko"
					spellcheck="false"
					onfocus="this.select()"
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
						@keyup.enter="addUser"
						:aria-label="$t('student.class')"
						v-model="newStudent.klasa"
						spellcheck="false"
						onfocus="this.select()"
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
						:aria-label="$t('student.phone-number')"
						@keyup.enter="addUser"
						placeholder="666666666"
						v-model="newStudent.telefon"
						spellcheck="false"
						onfocus="this.select()"
						tabindex="4"
					>
				</span>
			</div>
			<div id="checkmark" @click="addUser" :title="checkmarkStatus" :aria-label="checkmarkStatus">
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
	import { PropertiesValid } from '@/mixins/PropertiesValid';

	interface INewStudentThis {
		propertiesValid(student: IStudentsPropertiesRequiringValidation): string;
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
		checkmarkStatus: string = '';

		/* Actions */
		addStudent: (student: INewStudent) => IStudents;

		@Watch('newStudent', { deep: true })
		onNewStudentChange(): void {
			const propertiesValidMessage: any = this.propertiesValid(
				this.newStudent
			) as string;
			this.checkmarkStatus =
				propertiesValidMessage === true
					? this.$t('student.add')
					: propertiesValidMessage;
			const checkmarkColor =
				propertiesValidMessage === true ? 'rgb(12, 237, 0)' : 'red';
			(this.$el as HTMLDivElement).style.setProperty(
				`--new-student-checkmark-color`,
				checkmarkColor
			);
		}

		mounted() {
			this.onNewStudentChange();
		}

		async addUser() {
			const propertiesValidMessage: any = ((this as any) as INewStudentThis).propertiesValid(
				this.newStudent
			);
			if (propertiesValidMessage !== true) {
				alert(propertiesValidMessage);
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
