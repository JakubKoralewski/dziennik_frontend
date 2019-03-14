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
			titleTemplate: `${(this as any).$t('studentsCTA')}!`,
			htmlAttrs: {
				lang: this.$i18n.locale,
			},
		};
	},
	computed: mapState(['students']),
	methods: mapActions(['loadStudents']),
})
export default class App extends Mixins(TouchDetection) {
	get visibleStudents(): IStudent[] {
		// FIXME: (this as any).students is from mapState
		const students: IStudent[] = Object.values((this as any).students);
		console.groupCollapsed('visibleStudents');
		console.log('students: ', students);
		console.groupEnd();
		return students.filter((student: IStudent) => {
			return student.visible;
		});
	}
	public showNewStudentDialog: boolean = false;
	public coverActuallyHidden: boolean = true;
	public ADD_STUDENT_HASH_PATH: string = '';
	public students: IStudents;

	public $refs!: {
		sideBar: SideBar;
	};

	@Watch('$route')
	public onRouteChange(): void {
		const currentRoute = this.$router.currentRoute;
		const newHash = currentRoute.hash;
		console.log(`currentRoute:`, currentRoute, `newHash: ${newHash}`);
		if (newHash === this.$t('hashes.addStudent')) {
			this.showNewStudentDialog = true;
		} else {
			this.showNewStudentDialog = false;
		}
	}
	public async mounted() {
		await (this as any).loadStudents();
	}

	public leftSwipe(amount: number) {
		this.sideBarToggle(false);
	}
	public rightSwipe(amount: number) {
		this.sideBarToggle(true);
	}
	public toggleNewStudentDialog() {
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
	}
	public addButtonClick() {
		this.toggleNewStudentDialog();
		const firstNameElement: HTMLInputElement = document.querySelector(
			'.new-student input#imie'
		);
		console.log('focusing', firstNameElement);
		setTimeout(() => {
			firstNameElement.focus();
		}, 1);
	}
	public coverClick() {
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
	public sideBarToggle(newState: boolean) {
		console.log('sideBarToggle(), newState: ', newState);
		this.$refs.sideBar.sideBarVisibilityChange(newState);
	}
	protected created(): void {
		if (this.$route.hash === this.$t('hashes.addStudent')) {
			console.log('route hash is add-student-hash-path');
			this.toggleNewStudentDialog();
		}
		document.addEventListener(
			'touchstart',
			(this as any).handleTouchStart,
			false
		);
		document.addEventListener(
			'touchmove',
			(this as any).handleTouchMove,
			false
		);
	}
}
