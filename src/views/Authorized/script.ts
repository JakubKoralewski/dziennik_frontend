/* Packages */
import { Watch, Component, Mixins } from 'vue-property-decorator';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';

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

/** Controls Authorized.openSwipeSensitivity but in percentage.  */
const OPEN_SWIPE_SENSITIVITY_PERCENTAGE = 0.05;

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
	computed: {
		...mapState(['students', 'sideBarVisible']),
		...mapGetters(['visibleStudents']),
	},
	methods: {
		...mapActions(['loadStudents']),
		...mapMutations(['sideBarVisibilityChange', 'setViewportBelow500']),
	},
})
export default class Authorized extends Mixins(TouchDetection) {
	showNewStudentDialog: boolean = false;
	/** Used to hide cover with delay using CSS transitions.  */
	coverActuallyHidden: boolean = true;
	ADD_STUDENT_HASH_PATH: string = '';
	/** Value in pixels.
	 *  Defaults to 50px.
	 */
	openSwipeSensitivity: number = 50;
	viewportBelow500: boolean = false;

	/* State */
	students: IStudents;
	sideBarVisible: boolean;
	/* Actions */
	loadStudents: () => void;
	/* Mutations */
	sideBarVisibilityChange: (state: boolean) => void;
	setViewportBelow500: (newValue: boolean) => void;

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
		// media query event handler
		if (matchMedia) {
			const mq = window.matchMedia('(min-width: 500px)');
			mq.addListener(this.widthChange);
			this.widthChange(mq as any);
		}
		window.onresize = () => {
			this.openSwipeSensitivity =
				window.innerWidth * OPEN_SWIPE_SENSITIVITY_PERCENTAGE;
		};
		await this.loadStudents();
	}

	// media query change
	widthChange(mq: MediaQueryListEvent): void {
		if (mq.matches) {
			// window width is more than 500px
			this.setViewportBelow500(false);
		} else {
			// window width is less than 500px
			this.setViewportBelow500(true);
		}
	}

	created(): void {
		if (this.$route.hash === this.$t('hashes.add-student')) {
			console.log('route hash is add-student-hash-path');
			this.toggleNewStudentDialog();
		}
		document.addEventListener('touchstart', this.handleTouchStart, false);
		document.addEventListener('touchmove', this.handleTouchMove, false);
	}

	/** Swiping left when SideBar is open should close it, otherwise do nothing.  */
	leftSwipe(evt: TouchEvent) {
		this.sideBarToggle(false);
	}

	/** Swiping right near the edge should show sidebar.  */
	rightSwipe(evt: TouchEvent) {
		const xTouch = evt.touches[0].clientX;
		/* Only near the edge */
		if (xTouch < this.openSwipeSensitivity) {
			this.sideBarToggle(true);
		}
	}

	toggleNewStudentDialog() {
		if (this.showNewStudentDialog === false) {
			/* Making the dialog appear */
			console.log(this.$t('hashes.add-student'));
			history.pushState('', 'Dodaj ucznia', this.$t(
				'hashes.add-student'
			) as string);
			this.setCoverState(false, 100);
			/* If making NewStudentDialog appear show cover. */
		} else {
			/* Making the dialog disappear */
			console.log('Making the dialog disappear');
			this.$router.push(`/${this.$t('logged-in')}`);
			this.setCoverState(true);
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
		if (this.showNewStudentDialog) {
			this.toggleNewStudentDialog();
		} else if (this.showNewStudentDialog === false) {
			/* If making NewStudentDialog disappear set cover to disappear after timeout. */
			this.setCoverState(true, 100);
		}
		if (this.sideBarVisible) {
			this.sideBarVisibilityChange(false);
		}
	}
	async setCoverState(state?: boolean, timeout: number = 0) {
		if (state == undefined) {
			state = !this.sideBarVisible;
		}
		if (timeout) {
			setTimeout(() => {
				this.coverActuallyHidden = state;
			}, timeout);
		} else {
			this.coverActuallyHidden = state;
		}
	}

	sideBarToggle(newState: boolean) {
		this.setCoverState(newState);
		this.sideBarVisibilityChange(newState);
	}
}
