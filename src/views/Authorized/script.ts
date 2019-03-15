/* Packages */
import { Watch, Component, Mixins } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';

/* Components */
import SideBar from '@/components/SideBar.vue';
import NavTitle from '@/components/NavTitle.vue';
import Student from '@/components/Student.vue';
import NewStudent from '@/components/NewStudent.vue';
import AddButton from '@/components/AddButton.vue';

/* Interfaces */
import { IStudent, IStudents } from '@/interfaces';

/* Mixins */
import TouchDetection from '@/mixins/TouchDetection';

@Component({
	name: 'Authorized',
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
			titleTemplate: `${(this as any).$t('students-CTA')}!`,
			htmlAttrs: {
				lang: (this as any).$i18n.locale,
			},
		};
	},
	computed: mapState(['students']),
	methods: mapActions(['loadStudents']),
})
export default class Authorized extends Mixins(TouchDetection) {
	showNewStudentDialog: boolean = false;
	coverActuallyHidden: boolean = true;
	ADD_STUDENT_HASH_PATH: string = '';

	/* State */
	students: IStudents;
	/* Actions */
	loadStudents: () => void;

	$refs!: {
		sideBarComponent: SideBar;
	};

	@Watch('$route')
	onRouteChange(): void {
		const currentRoute = this.$router.currentRoute;
		const newHash = currentRoute.hash;
		console.log(`currentRoute:`, currentRoute, `newHash: ${newHash}`);
		if (newHash === this.$t('hashes.add-student')) {
			this.showNewStudentDialog = true;
		} else {
			this.showNewStudentDialog = false;
		}
	}

	async mounted() {
		await this.loadStudents();
	}

	created(): void {
		if (this.$route.hash === this.$t('hashes.add-student')) {
			console.log('route hash is add-student-hash-path');
			this.toggleNewStudentDialog();
		}
		document.addEventListener('touchstart', this.handleTouchStart, false);
		document.addEventListener('touchmove', this.handleTouchMove, false);
	}

	get visibleStudents(): IStudent[] {
		const students: IStudent[] = Object.values(this.students);
		console.groupCollapsed('visibleStudents');
		console.log('students: ', students);
		console.groupEnd();
		return students.filter((student: IStudent) => {
			return student.visible;
		});
	}

	leftSwipe(amount: number) {
		this.sideBarToggle(false);
	}

	rightSwipe(amount: number) {
		this.sideBarToggle(true);
	}

	toggleNewStudentDialog() {
		if (this.showNewStudentDialog === false) {
			// this.$router.push({ name: 'Add Student' });
			/* Making the dialog appear */
			console.log(this.$t('hashes.add-student'));
			history.pushState('', 'Dodaj ucznia', this.$t(
				'hashes.add-student'
			) as string);
			this.coverActuallyHidden = false;
			/* If making NewStudentDialog appear show cover. */
		} else {
			/* Making the dialog disappear */
			console.log('Making the dialog disappear');
			this.$router.push(`/${this.$t('logged-in')}`);
		}
		this.showNewStudentDialog = !this.showNewStudentDialog;
	}

	addButtonClick() {
		this.toggleNewStudentDialog();
		const firstNameElement: HTMLInputElement = document.querySelector(
			'.new-student input#imie'
		);
		console.log('focusing', firstNameElement);
		setTimeout(() => {
			firstNameElement.focus();
		}, 1);
	}

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
	}

	sideBarToggle(newState: boolean) {
		console.log('sideBarToggle(), newState: ', newState);
		// FIXME: it's actually fine but fix it so it's not an error https://github.com/vuejs/vetur/issues/213
		this.$refs.sideBarComponent.sideBarVisibilityChange(newState);
	}
}
