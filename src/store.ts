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
			// Check if students already gotten
			// if (state.students[0] == null) {
			if (state.students[0] == null) {
				// If not create API request
				fetch(
					'http://localhost/projekt_php_backend/api/uczniowie.php',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json; charset=UTF-8',
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Credentials': 'true',
						},
					}
				)
					.then(response => {
						if (response.ok === true) {
							console.log('Uczniowie zdobyci.');
						} else {
							console.error('Nie udało się zdobyć uczniów.');
						}
						return response.json();
					})
					.then(data => {
						for (const student of data) {
							state.students[student.id] = student;
						}
					})
					.catch(error => {
						console.error(error);
					});
			}
			return state.students;
		},
	},
});
