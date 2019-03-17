import Vue from 'vue';
import { IStudent, IState } from '@/interfaces';

export default {
	/** Add new student/students. Works for both.
	 *  Sets visible property before setting it, which doesn't screw the reactivity.
	 *  @param { IStudent[] | IStudent } data - added student/s
	 */
	add(state: IState, data: IStudent[] | IStudent) {
		if (data.constructor === Array) {
			console.log('Adding array of students.');
			for (const student of data as IStudent[]) {
				student.visible = true;
				Vue.set(state.students, student.id, student);
			}
		} else if (data.hasOwnProperty('id')) {
			console.log('Adding single student object.');
			(data as IStudent).visible = true;
			Vue.set(state.students, (data as IStudent).id, data);
		} else {
			console.error(
				'Store `add` mutation neither array or an object containing `id` property.'
			);
		}
	},
	/** Change whether sideBar is open or closed
	 *  @param { boolean } new_value - whether it's closed or open
	 */
	sideBarVisibilityChange(state: IState, new_value: boolean) {
		state.sideBarVisible = new_value;
	},
	/** Delete particular student.
	 *  @param {number} id - student's id to delete
	 */
	delete(state: IState, id: number) {
		Vue.delete(state.students, id);
	},
	/** Supply
	 * @param { number } id - the id of the student visibility to change
	 * @param { boolean } newVisibility - that new visibility
	 */
	changeVisibility(
		state: IState,
		payload: { id: number; newVisibility: boolean }
	) {
		Vue.set(state.students[payload.id], 'visible', payload.newVisibility);
		console.log(state.students[payload.id]);
	},
	setSearchText(state: IState, searchText: string) {
		state.searchText = searchText;
	},
};
