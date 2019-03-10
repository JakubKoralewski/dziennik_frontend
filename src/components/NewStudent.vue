<template>
	<div class="new-student student">
		<div id="header">
			<div id="name">
				<!-- FIXME: autofocus works first time, but then doesn't -->
				<input type="text" id="imie" :placeholder="$t('student.firstName')" v-model="newStudent.imie" autofocus spellcheck="false">
				<input type="text" id="nazwisko" :placeholder="$t('student.lastName')" v-model="newStudent.nazwisko" spellcheck="false">
			</div>
		</div>
		<div id="content">
			<div id="klasa">
				{{$t('student.class')}}:
				<span class="info">
					<input type="text" id="klasa" placeholder="3d" v-model="newStudent.klasa" spellcheck="false">
				</span>
			</div>
			<div id="telefon">
				{{$t('student.phoneNumber')}}:
				<span class="info">
					<input type="text" id="telefon" placeholder="666666666" v-model="newStudent.telefon" spellcheck="false">
				</span>
			</div>
			<div id="checkmark" @click="addUser">
				<i class="fas fa-check"></i>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import {
		IStudent,
		INewStudent,
		IStudentsPropertiesRequiringValidation,
	} from '@/interfaces';
	import { mapActions } from 'vuex';
	import propertiesValid from '@/mixins/propertiesValid';

	interface INewStudentThis {
		propertiesValid(
			student: IStudentsPropertiesRequiringValidation,
			shouldCreateAlerts?: boolean
		): boolean;
	}

	export default Vue.extend({
		name: 'NewStudent',
		mixins: [propertiesValid],
		data() {
			return {
				newStudent: {
					imie: '',
					nazwisko: '',
					klasa: '',
					telefon: '',
				} as INewStudent,
				allPropertiesValid: false,
			};
		},
		watch: {
			newStudent: {
				handler(oldValue, newValue) {
					this.allPropertiesValid = ((this as any) as INewStudentThis).propertiesValid(
						this.newStudent,
						false
					);
					const checkmarkColor = this.allPropertiesValid
						? 'rgb(12, 237, 0)'
						: 'red';
					this.$el.setAttribute(
						'style',
						`--new-student-checkmark-color: ${checkmarkColor}`
					);
					console.log(this.$el);
				},
				deep: true,
			},
		},
		methods: {
			...mapActions(['addStudent']),
			async addUser() {
				const allPropertiesValid = ((this as any) as INewStudentThis).propertiesValid(
					this.newStudent
				);
				if (!allPropertiesValid) {
					return;
				}
				this.$emit('newStudentAdded');
				const response = await (this as any).addStudent(this.newStudent);
			},
		},
	});
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

			#checkmark {
				margin: 2rem;
				margin-top: auto;
				margin-left: auto;

				cursor: pointer;
				transition: color 200ms ease-out;

				color: var(--new-student-checkmark-color);
				i {
					font-size: 2rem;
				}
			}
		}
	}
</style>
