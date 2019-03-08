import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { IStudent, IStudents, INewStudent } from '@/interfaces';
import { API_URL } from '@/config';

interface IState {
	students: IStudents;
}

interface IDeleteResponse {
	/** The id   */
	uczen: number;
}

function findId(students: number[]) {
	// newId: https://i.imgur.com/JWBbOsb.png, but https://i.imgur.com/4Fvg0dv.png
	if (students.length === 0) {
		return 0;
	} else if (students.length === 1) {
		if (students[0] === 0) {
			return 1;
		} else {
			return 0;
		}
	} else if (students.length === 2) {
		if (students[0] > 0) {
			// [>=1, >=2]
			return 0;
		} else {
			// [0, >0]
			if (students[1] == 1) {
				return 2;
			} else {
				return 1;
			}
		}
	} else {
		for (let i = 1; i < students.length; i++) {
			if (students[i] - students[i - 1] != 1) {
				const firstValue = students[i - 1];
				console.log('firstValue:', firstValue);
				return firstValue + 1;
			}
		}
		if (students[0] > 0) {
			return 0;
		} else {
			return students[students.length - 1] + 1;
		}
	}
	return 'ERROR';
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
				data.visible = true;
				Vue.set(state.students, data.id, data);
			} else {
				console.error(
					'Store `add` mutation neither array or an object containing `id` property.'
				);
			}
		},
		delete(state, id) {
			Vue.delete(state.students, id);
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
			return fetch(`${API_URL}api/uczniowie.php`, {
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
				for (let property of Object.values(student)) {
					if (typeof property === 'boolean') {
						continue;
					} else if (!isNaN(property)) {
						property = (property as number).toString();
					} else if (
						(property as string).toLowerCase().includes(searchText)
					) {
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
		async addStudent({ state, commit }, newStudent: INewStudent) {
			// Find new ID
			const studentsIds = Object.keys(state.students)
				.map(id => parseInt(id, 10))
				.sort((a, b) => a - b);
			const newId = findId(studentsIds);
			const body = JSON.stringify(
				Object.assign({ id: newId.toString() }, newStudent)
			);
			console.log('requestBody:', body);
			return fetch(`${API_URL}api/uczniowie.php`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': 'true',
				},
				body,
			})
				.then(response => {
					if (response.ok !== true) {
						console.error('Nie udało się dodać ucznia.');
					} else {
						return response.json();
					}
				})
				.then(data => {
					console.log(`commit('add',`, data, `);`);
					commit('add', data.uczen);
					console.log('state.students', state.students);
					return state.students;
				})
				.catch(error => {
					console.error(error);
				});
		},
		async deleteStudent({ state, commit }, id) {
			return fetch(`${API_URL}api/uczniowie.php`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': 'true',
				},
				body: JSON.stringify({ id }),
			})
				.then(response => {
					if (response.ok !== true) {
						console.error('Nie udało się usunąć ucznia.');
					}
					return response.json() as Promise<IDeleteResponse>;
				})
				.then(data => {
					console.log(`commit('add',`, data, `);`);
					commit('delete', data.uczen);
					console.log('state.students', state.students);
					return state.students;
				})
				.catch(error => {
					console.error(error);
				});
		},
	},
	getters: {},
});
