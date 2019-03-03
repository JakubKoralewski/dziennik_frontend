import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { IStudent, IStudents } from '@/interfaces';

interface IState {
	students: IStudents;
}

export default new Vuex.Store({
	state: {
		students: {},
	} as IState,
	mutations: {
		add(state, data) {
			const newStudentState: IStudents = {};
			if (data.constructor === Array) {
				console.log('Adding array of students.');
				for (const student of data as IStudent[]) {
					student.visible = true;
					Vue.set(state.students, student.id, student);
				}
			} else if (data.hasOwnProperty('id')) {
				console.log('Adding single student object.');
				Vue.set(state.students, data.id, data);
			} else {
				console.error(
					'Store `add` mutation neither array or an object containing `id` property.'
				);
			}
		},
		/**
		 *
		 * @param state vuex state
		 * @param { {number, boolean} } payload - id , newVisibility
		 */
		changeVisibility(
			state,
			payload: { id: number; newVisibility: boolean }
		) {
			// console.log(
			// 	'changing visibility of',
			// 	state.students[payload.id],
			// 	'to:',
			// 	payload.newVisibility
			// );
			Vue.set(
				state.students[payload.id],
				'visible',
				payload.newVisibility
			);
			console.log(state.students[payload.id]);
		},
	},
	actions: {
		async loadStudents({ state, commit }) {
			return fetch(`api/uczniowie.php`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': 'true',
				},
			})
				.then(response => {
					if (response.ok !== true) {
						console.error('Nie udało się zdobyć uczniów.');
					}
					return response.json();
				})
				.then(data => {
					console.log(`commit('add',`, data, `);`);
					commit('add', data);
					console.log('state.students', state.students);
					return state.students;
				})
				.catch(error => {
					console.error(error);
				});
		},
		/** Searches every property of student for searchText.
		 */
		searchStudents: ({ state, commit }, searchText) => {
			console.log(`searching students for ${searchText}`);
			searchText = searchText.toLowerCase();
			Object.values(state.students).forEach((student: IStudent) => {
				console.log('student', student);
				for (const property of Object.values(student)) {
					if (typeof property === 'boolean') {
						continue;
					} else if (property.toLowerCase().includes(searchText)) {
						commit('changeVisibility', {
							id: student.id,
							newVisibility: true,
						});
						break;
					} else {
						commit('changeVisibility', {
							id: student.id,
							newVisibility: false,
						});
					}
				}
			});
			console.log('state after search: ', state.students);
		},
		showAllStudents({ state, commit }) {
			Object.values(state.students).forEach(student => {
				commit('changeVisibility', {
					id: student.id,
					newVisibility: true,
				});
			});
		},
	},
	getters: {},
});
