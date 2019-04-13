import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { IStudent, IState } from '@/interfaces';

import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
	storage: window.sessionStorage,
	reducer: (state: any) => {
		return {
			sideBarVisible: state.sideBarVisible,
			currentURL: state.currentURL,
			searchText: state.searchText,
		};
	},
});

import mutations from './mutations';
import actions from './actions';

export default new Vuex.Store({
	state: {
		students: {},
		sideBarVisible: false,
		searchText: '',
		currentEdits: [],
		viewportBelow500: false,
		isSearchWrapped: false,
		areStudentsLoaded: false,
	} as IState,
	plugins: [vuexLocal.plugin],
	mutations,
	actions,
	getters: {
		numberOfEdits: state => {
			return state.currentEdits.length;
		},
		visibleStudents: state => {
			const students: IStudent[] = Object.values(state.students);
			return students.filter((student: IStudent) => {
				return student.visible;
			});
		},
		editIndex: state => (id: string) => {
			return state.currentEdits.indexOf(id);
		},
	},
});
