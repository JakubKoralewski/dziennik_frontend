import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface IState {
	students: { [index: number]: object };
}

export default new Vuex.Store({
	state: {
		students: {},
	} as IState,
	mutations: {},
	actions: {},
	getters: {
		getStudents(state) {
			// Check if students already fetched
			if (state.students[0] == null) {
				// If not create API request
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
						for (const student of data) {
							state.students[student.id] = student;
						}
						return state.students;
					})
					.catch(error => {
						console.error(error);
					});
			} else {
				return state.students;
			}
		},
	},
});
