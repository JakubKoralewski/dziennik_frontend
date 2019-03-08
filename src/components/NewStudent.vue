<template>
	<div class="new-student student">
		<div id="header">
			<div id="name">
				<input type="text" id="imie" placeholder="Imię" v-model="newStudent.imie">
				<input type="text" id="nazwisko" placeholder="Nazwisko" v-model="newStudent.nazwisko">
			</div>
		</div>
		<div id="content">
			<div id="klasa">
				Klasa:
				<span class="info">
					<input type="text" id="klasa" placeholder="3d" v-model="newStudent.klasa">
				</span>
			</div>
			<div id="telefon">
				Telefon:
				<span class="info">
					<input type="text" id="telefon" placeholder="666666666" v-model="newStudent.telefon">
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
	import { IStudent, INewStudent } from '@/interfaces';
	import { mapActions } from 'vuex';

	const studentProperties = {
		imie: 'Imię',
		nazwisko: 'Nazwisko',
		klasa: 'Klasa',
		telefon: 'Telefon',
	} as IStudentProperties;

	interface IStudentProperties {
		imie: string;
		nazwisko: string;
		klasa: string;
		telefon: string;
		[key: string]: string;
	}

	export default Vue.extend({
		name: 'NewStudent',
		data() {
			return {
				newStudent: {
					imie: '',
					nazwisko: '',
					klasa: '',
					telefon: '',
				} as INewStudent,
			};
		},
		methods: {
			...mapActions(['addStudent']),
			async addUser() {
				let foundInvalidInput = false;
				for (const key of Object.keys(this.newStudent)) {
					const value = this.newStudent[key];
					if (!!value == false) {
						// TODO: alert component
						foundInvalidInput = true;
						alert(`${studentProperties[key]} niepoprawne.`);
						break;
					}
					if (key === 'telefon' && isNaN(value as any)) {
						foundInvalidInput = true;
						alert(`${studentProperties[key]} powinien być numerem.`);
						break;
					}
				}
				if (foundInvalidInput) {
					return;
				}
				this.$emit('newStudentAdded');
				const response = await (this as any).addStudent(this.newStudent);
			},
		},
	});
</script>

<style lang="scss">
	div.new-student.student {
		position: absolute;
		width: calc(100px + 50vw);
		height: calc(100px + 30vh);
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;

		#content {
			height: 100%;
			display: flex;
			flex-direction: column;

			#checkmark {
				margin: 2rem;
				margin-top: auto;
				margin-left: auto;

				cursor: pointer;
				transition: color 200ms ease-out;

				&:hover {
					color: red;
				}
				i {
					font-size: 2rem;
				}
			}
		}
	}
</style>
