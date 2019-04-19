import { API_URL } from '@/config';
import { ActionContext } from 'vuex';
import {
	IStudent,
	INewStudent,
	IEditData,
	IDeleteResponse,
	IEditResponse,
	IState,
} from '@/interfaces';

interface IActionContext extends ActionContext<IState, any> {}
// tslint:disable:jsdoc-format
// tslint:disable:quotemark

export default {
	/** Creates GET API request for all students.
	 *  Adds them to Vuex state.
	 */
	async loadStudents({ state, commit }: IActionContext) {
		return fetch(`${API_URL}api/students`, {
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
	},
	/** Searches every property of student for searchText.
	 *  If property is a number, converts to string.
	 *  Converted to lowercase for case insensitivity.
	 *  Changes visibility of student depending on whether the text was found.
	 *  @param { string } searchText
	 */
	searchStudents: ({ state, commit }: IActionContext, searchText: string) => {
		console.log(`searching students for ${searchText}`);
		searchText = searchText.toLowerCase();
		Object.values(state.students).forEach((student: IStudent) => {
			/* Make searching by the full name possible as well. */
			student.fullName = student.first_name + ' ' + student.last_name;
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
	/** Sets every student's visibility to true.  */
	showAllStudents({ state, commit }: IActionContext) {
		Object.values(state.students).forEach(student => {
			commit('changeVisibility', {
				id: student.id,
				newVisibility: true,
			});
		});
	},
	/** Creates POST API request to add a new student to the database.
	 *  @param { INewStudent } newStudent - student to add
	 *  @returns { IStudents } - state.students
	 */
	async addStudent(
		{ state, commit }: IActionContext,
		newStudent: INewStudent
	) {
		const body = JSON.stringify(newStudent);
		console.log('requestBody:', body);
		return fetch(`${API_URL}api/students`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
			},
			body,
		})
			.then(async response => {
				const data = await response.json();
				if (response.ok !== true) {
					console.error(`Couldn't add student`);
				} else {
					console.log(`commit('add',`, data, `);`);
					commit('add', data.student);
					console.log('state.students', state.students);
				}
				return state.students;
			})
			.catch(error => {
				console.error(error);
			});
	},
	/** Creates POST API request to delete student from databse.
	 *  @param { number } id - student to delete
	 */
	async deleteStudent({ state, commit }: IActionContext, id: number) {
		return fetch(`${API_URL}api/students/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
			},
		})
			.then(response => {
				if (response.ok === true) {
					console.log(`commit('delete',`, id, `);`);
					commit('delete', id);
					console.log('state.students', state.students);
					return true;
				} else {
					console.error("Can't delete student.");
					return false;
				}
			})
			.catch(error => {
				console.error(error);
			});
	},
	/** Creates PUT API request to change existing data of particular student on server.
	 *  @param { IEditData } edit_data example:
	 * 	```{
	 *		"id": 2,
	 *		"new_data": {
	 *			"first_name": 'xd2',
	 *			"phone_number": 123123123
	 *		}
	 *	}```
	 */
	async editStudent({}, edit_data: IEditData) {
		return fetch(`${API_URL}api/students/${edit_data.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
			},
			body: JSON.stringify(edit_data.new_properties),
		})
			.then(response => {
				if (response.ok !== true) {
					console.error("Can't edit student.");
				}
				return response.json() as Promise<IEditResponse>;
			})
			.catch(error => {
				console.error(error);
			});
	},
};
