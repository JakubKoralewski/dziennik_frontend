import { IStudentsPropertiesRequiringValidation } from '@/interfaces';

const studentProperties = {
	imie: 'Imię',
	nazwisko: 'Nazwisko',
	klasa: 'Klasa',
	telefon: 'Telefon',
} as IStudentProperties;

interface IStudentProperties {
	imie: string;
	nazwisko: string;
	klasa: string;
	telefon: string;
	[key: string]: string;
}

export default {
	methods: {
		/** Gets a student object.
		 *  Creates alerts saying which property is bad.
		 *  Returns true if all properties valid else false.
		 */
		propertiesValid(
			student: IStudentsPropertiesRequiringValidation,
			shouldCreateAlerts: boolean = true
		): boolean {
			let foundInvalidInput = false;
			for (const key of Object.keys(student)) {
				const value = student[key];
				if (!!value == false) {
					// TODO: alert component
					foundInvalidInput = true;
					if (shouldCreateAlerts) {
						alert(`${studentProperties[key]} niepoprawne.`);
					}
					break;
				}
				if (key === 'telefon' && isNaN(value as any)) {
					foundInvalidInput = true;
					if (shouldCreateAlerts) {
						alert(
							`${studentProperties[key]} powinien być numerem.`
						);
					}
					break;
				}
			}
			return !foundInvalidInput;
		},
	},
};
