import { API_URL } from '@/config';
import { ActionContext } from 'vuex';
import findId from './findId';
import {
	IStudent,
	INewStudent,
	IEditData,
	IDeleteResponse,
	IEditResponse,
	IState,
} from '@/interfaces';

interface IActionContext extends ActionContext<IState, any> {}

export default {
	async loadStudents({ state, commit }: IActionContext) {
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
	searchStudents: ({ state, commit }: IActionContext, searchText: string) => {
		console.log(`searching students for ${searchText}`);
		searchText = searchText.toLowerCase();
		Object.values(state.students).forEach((student: IStudent) => {
			console.log('student', student);
			for (let property of Object.values(student)) {
				if (typeof property === 'boolean') {
					continue;
				} else if (!isNaN(property)) {
					property = (property as number).toString();
				}
				if ((property as string).toLowerCase().includes(searchText)) {
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
	showAllStudents({ state, commit }: IActionContext) {
		Object.values(state.students).forEach(student => {
			commit('changeVisibility', {
				id: student.id,
				newVisibility: true,
			});
		});
	},
	async addStudent(
		{ state, commit }: IActionContext,
		newStudent: INewStudent
	) {
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
	async deleteStudent({ state, commit }: IActionContext, id: number) {
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
	async editStudent({}, edit_data: IEditData) {
		return fetch(`${API_URL}api/uczniowie.php`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
			},
			/* Should look like this:
			{
				"id": 2,
				"new_data": {
					"imie": 'xd2',
					"telefon": 123123123
				}
			}
			
			*/
			body: JSON.stringify({
				id: parseInt(edit_data.id, 10),
				new_data: edit_data.new_properties,
			}),
		})
			.then(response => {
				if (response.ok !== true) {
					console.error('Nie udało się edytować ucznia.');
				}
				return response.json() as Promise<IEditResponse>;
			})
			.catch(error => {
				console.error(error);
			});
	},
};
