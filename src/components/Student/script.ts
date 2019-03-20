import { Vue, Component, Watch } from 'vue-property-decorator';
// import { IStudent } from '@/interfaces';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
import { IStudent, IStudents } from '@/interfaces';
import { PropertiesValid, IPropertiesValid } from '@/mixins/PropertiesValid';
import { Sleep, ISleep } from '@/mixins/Sleep';

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
	methods: {
		...mapActions({
			storeDeleteStudent: 'deleteStudent',
			storeEditStudent: 'editStudent',
		}),
		...mapMutations(['addCurrentEdit', 'deleteCurrentEdit']),
	},
	computed: {
		editNumber: {
			get() {
				return this.$store.state.numberOfEdits;
			},
		},
		...mapState(['viewportBelow500', 'currentEdits']),
		...mapGetters(['numberOfEdits', 'editIndex']),
	},
	mixins: [PropertiesValid, Sleep],
})
export default class Student extends StudentComponentProps {
	editMode: boolean = false;
	/** When user chooses to enter editMode this variable preserves the initial data in case of canceling the edit.  */
	backup: IStudent | {} = {};
	student: IStudent = this.initialStudent;
	studentReactive: IStudent = this.student;
	remindToClickActive: boolean = false;
	checkmarkStatus: string = '';
	elements: any = {};
	canBeSaved: boolean = false;

	/* State */
	viewportBelow500: boolean;

	/* Actions */
	storeDeleteStudent: (id: string) => Promise<IStudents>;

	/* Mutations */
	addCurrentEdit: (id: string) => void;
	deleteCurrentEdit: (id: string) => void;

	/* Getters */
	editIndex: (id: string) => string;
	numberOfEdits: number;

	/* From mixin PropertiesValid */
	propertiesValid: IPropertiesValid;
	/* From mixin Sleep */
	sleep: ISleep;

	@Watch('currentEdits')
	onEditsChange() {
		(this.$el as HTMLDivElement).style.setProperty(
			'--edit-index',
			this.editIndex(this.student.id)
		);
		console.log(this.$el);
	}

	created() {
		this.student = this.initialStudent;
		this.checkmarkStatus = this.$t('alert.no-value-changed') as string;
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
			this.addCurrentEdit(this.student.id);
			// (this.$el as HTMLDivElement).style.setProperty('--');

			/* Save old data in case user cancels.  */
			this.backup = Object.assign({}, this.student);

			/* Highlight editable properties with some sort of CSS animation. */
			this.editMode = true;
		} else {
			/* Turning edit mode off. */
			this.deleteCurrentEdit(this.student.id);
			this.editMode = false;
		}
		console.log('this.$store.state.numberOfEdits', this.numberOfEdits);
	}
	restoreBackup() {
		this.student = this.backup as IStudent;
		this.backup = {};
	}
	cancelEdit() {
		console.log('cancelEdit()');
		this.toggleEditMode();
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
		const propertiesValidMessage = this.propertiesValid(new_properties);
		if (propertiesValidMessage !== true) {
			alert(propertiesValidMessage);
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
		Vue.set(this.student, event.target.id, event.target.innerText);
		console.log(this.student);
	}
	async refreshCheckmarkStatus(evt: Event) {
		const evtTarget: HTMLDivElement = evt.target as HTMLDivElement;
		const newText = evtTarget.innerText;
		const mockStudent: any = {};
		mockStudent[evtTarget.id] = evtTarget.innerText;
		this.studentReactive[evtTarget.id] = evtTarget.innerText;
		console.log(newText);
		const propertiesValidMessage: any = this.propertiesValid(mockStudent);
		console.log('propertiesValidMessage', propertiesValidMessage);
		if (propertiesValidMessage === true) {
			this.checkmarkStatus = this.$t('edit.save') as string;
			this.canBeSaved = true;
		} else {
			this.canBeSaved = false;
			this.checkmarkStatus = propertiesValidMessage;
		}
	}
	/** Gets called when firstName, lastName, class or phoneNumber is clicked when editMode is off.  */
	async uneditableInputClick(evt: MouseEvent) {
		this.remindToClickActive = true;
		await this.sleep(800);
		this.remindToClickActive = false;
	}
}
