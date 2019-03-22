import { IActionContext } from '@/interfaces';

// import * as fs from 'fs'; // for types
const fs: any = jest.genMockFromModule('fs');

/** Creates GET API request for all students.
 *  Adds them to Vuex state.
 */
export default async function loadStudents({ commit }: IActionContext) {
	console.groupCollapsed('__mocks__');
	return fs.readFile(
		'uczniowie.json',
		(err: NodeJS.ErrnoException, data: Buffer) => {
			if (err) {
				throw err;
			}
			const students = JSON.parse(data as any);
			console.log('students: ', students);
			commit('add', students);

			console.groupEnd();
			return students;
		}
	);
}
