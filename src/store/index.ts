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
	} as IState,
	plugins: [
		createPersistedState({
			paths: ['sideBarVisible', 'students', 'searchText'],
		}),
	],
	mutations,
	actions,
	getters: {
		visibleStudents: state => {
			const students: IStudent[] = Object.values(state.students);
			return students.filter((student: IStudent) => {
				return student.visible;
			});
		},
	},
});
