import Vue from 'vue';
// import { IStudent } from '@/interfaces';
import { mapActions } from 'vuex';

// class Student implements IStudent {
// 	constructor(public id: number, public imie: string,
// public nazwisko: string, public klasa: string, public telefon: number) {}
// }

interface IEditEvent extends Event {
	target: HTMLSpanElement;
}

export default Vue.extend({
	name: 'Student',
	props: {
		initialStudent: {
			type: Object,
			required: true,
		},
	},
	data: function() {
		return {
			editMode: false,
			/** When user chooses to enter editMode this variable preserves the initial data in case of canceling the edit.  */
			backup: {},
			student: this.initialStudent,
		};
	},
	created() {
		this.student = this.initialStudent;
	},
	methods: {
		...mapActions({ storeDeleteStudent: 'deleteStudent' }),
		deleteStudent() {
			const wantsToDelete: boolean = confirm(
				`Na pewno chcesz usunąć ucznia: ${this.student.imie} ${
					this.student.nazwisko
				}?`
			);
			if (!wantsToDelete) {
				return;
			}
			console.log(`deleting student nr. ${this.student.id}`);
			(this as any).storeDeleteStudent(this.student.id);
		},
		toggleEditMode() {
			if (this.editMode === false) {
				/* Turning edit mode on. */

				/* Save old data in case user cancels.  */
				// this.backup = this.student;
				this.backup = Object.assign({}, this.student);

				/* Highlight editable properties with some sort of CSS animation. */

				this.editMode = true;
			} else {
				/* Turning edit mode off. */
				this.editMode = false;
			}
		},
		cancelEdit() {
			console.log('cancelEdit()');
			this.editMode = false;
			this.student = this.backup;
			// Vue.set(this, 'students', this.backup);
			this.backup = {};
		},
		saveEdit() {
			console.log('saveEdit()');
		},
		editAnyText(event: IEditEvent) {
			/* event.target.id is the name of property, e.g.: 'imie', 'nazwisko' etc. */
			this.student[event.target.id] = event.target.innerText;
			console.log(this.student);
		},
	},
});
