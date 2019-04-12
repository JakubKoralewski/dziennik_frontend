import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { IStudent, IState } from '@/interfaces';

import createPersistedState from 'vuex-persistedstate';

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
	plugins: [
		createPersistedState({
			paths: ['sideBarVisible', 'searchText', 'currentURL'],
		}),
	],
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
