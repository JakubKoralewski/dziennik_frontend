import { Vue, Component } from 'vue-property-decorator';
// import { IStudent } from '@/interfaces';
import { mapActions } from 'vuex';
import {
	IStudent,
	IStudentsPropertiesRequiringValidation,
	IStudents,
} from '@/interfaces';
import PropertiesValid from '@/mixins/PropertiesValid';
import Sleep from '@/mixins/Sleep';

interface IEditEvent extends Event {
	target: HTMLSpanElement;
}

const StudentComponentProps = Vue.extend({
	props: {
		initialStudent: {
			type: Object,
			required: true,
		},
	},
});

@Component({
	name: 'Student',
	methods: mapActions({
		storeDeleteStudent: 'deleteStudent',
		storeEditStudent: 'editStudent',
	}),
	mixins: [PropertiesValid, Sleep],
})
export default class Student extends StudentComponentProps {
	editMode: boolean = false;
	/** When user chooses to enter editMode this variable preserves the initial data in case of canceling the edit.  */
	backup: IStudent | {} = {};
	student: IStudent = this.initialStudent;
	remindToClickActive: boolean = false;

	/* Actions */
	storeDeleteStudent: (id: string) => Promise<IStudents>;

	/* From mixin PropertiesValid */
	propertiesValid: (
		student: IStudentsPropertiesRequiringValidation,
		shouldCreateAlerts?: boolean
	) => boolean;
	/* From mixin Sleep */
	sleep: (amountToSleep: number) => void;

	created() {
		this.student = this.initialStudent;
	}

	deleteStudent() {
		const wantsToDelete: boolean = confirm(this.$t(
			'alert.delete.are-you-sure',
			{
				firstName: this.student.imie,
				lastName: this.student.nazwisko,
			}
		) as string);
		if (!wantsToDelete) {
			return;
		}
		console.log(this.$t('alert.deleting-student', { id: this.student.id }));
		(this as any).storeDeleteStudent(this.student.id);
	}
	toggleEditMode() {
		if (this.editMode === false) {
			/* Turning edit mode on. */

			/* Save old data in case user cancels.  */
			this.backup = Object.assign({}, this.student);

			/* Highlight editable properties with some sort of CSS animation. */
			this.editMode = true;
		} else {
			/* Turning edit mode off. */
			this.editMode = false;
		}
	}
	restoreBackup() {
		this.student = this.backup as IStudent;
		this.backup = {};
	}
	cancelEdit() {
		console.log('cancelEdit()');
		this.editMode = false;
		this.restoreBackup();
	}
	async saveEdit() {
		console.log('saveEdit()');
		const new_properties: { [index: string]: any } = {};
		let foundAnyNewProperties = false;
		for (const key of Object.keys(this.student)) {
			if (this.student[key] !== (this.backup as IStudent)[key]) {
				new_properties[key] = this.student[key];
				foundAnyNewProperties = true;
			}
		}
		if (!foundAnyNewProperties) {
			alert(this.$t('alert.no-value-changed'));
			return;
		}
		const allPropertiesValid = this.propertiesValid(new_properties);
		if (!allPropertiesValid) {
			return;
		}
		console.log(
			`${this.$t('alert.found-new-properties') as string}!`,
			new_properties
		);
		this.$el.classList.add('editing-in-progress');

		const editResponse = await (this as any).storeEditStudent({
			id: this.student.id,
			new_properties,
		});
		this.$el.classList.remove('editing-in-progress');

		if (editResponse == false) {
			this.restoreBackup();
			return;
		}

		this.editMode = false;

		console.log('editResponse', editResponse);
	}
	editAnyText(event: IEditEvent) {
		/* Content editable structure taken straight from here:
		 * https://gist.github.com/ctf0/2789d97b8301bcc6219b30734d224033
		 */
		/* event.target.id is the name of property, e.g.: 'imie', 'nazwisko' etc. */
		this.student[event.target.id] = event.target.innerText;
		console.log(this.student);
	}
	/** Gets called when firstName, lastName, class or phoneNumber is clicked when editMode is off.  */
	async uneditableInputClick(evt: MouseEvent) {
		this.remindToClickActive = true;
		await this.sleep(800);
		this.remindToClickActive = false;
	}
}
