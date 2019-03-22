import { API_URL } from '@/config';
import { IStudent, IActionContext } from '@/interfaces';

/** Creates GET API request for all students.
 *  Adds them to Vuex state.
 */
export default async function loadStudents({ state, commit }: IActionContext) {
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
				console.error(`Couldn't get students.`);
			}
			return response.json();
		})
		.then((data: IStudent[]) => {
			console.log(`commit('add',`, data, `);`);
			/* Add students to state */
			commit('add', data);
			console.log('state.students', state.students);
			return state.students;
		})
		.catch(error => {
			console.error(error);
		});
}
