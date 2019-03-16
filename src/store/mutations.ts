import Vue from 'vue';
import { IStudent, IState } from '@/interfaces';

export default {
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
	sideBarVisibilityChange(state: IState, new_value: boolean) {
		state.sideBarVisible = new_value;
	},
	delete(state: IState, id: number) {
		Vue.delete(state.students, id);
	},
	/**
	 *
	 * @param state vuex state
	 * @param { {number, boolean} } payload - id , newVisibility
	 */
	changeVisibility(
		state: IState,
		payload: { id: number; newVisibility: boolean }
	) {
		// console.log(
		// 	'changing visibility of',
		// 	state.students[payload.id],
		// 	'to:',
		// 	payload.newVisibility
		// );
		Vue.set(state.students[payload.id], 'visible', payload.newVisibility);
		console.log(state.students[payload.id]);
	},
};
