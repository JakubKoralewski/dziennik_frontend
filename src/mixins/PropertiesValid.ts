import { Vue, Component } from 'vue-property-decorator';
import { IStudentsPropertiesRequiringValidation } from '@/interfaces';

const studentProperties = {
	imie: 'first-name',
	nazwisko: 'last-name',
	klasa: 'class',
	telefon: 'phone-number',
} as IStudentProperties;

interface IStudentProperties {
	imie: string;
	nazwisko: string;
	klasa: string;
	telefon: string;
	[key: string]: string;
}

/** Provides a propertiesValid method.  */
@Component
export default class PropertiesValid extends Vue {
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

			if (key === 'telefon') {
				foundInvalidInput = true;
				if (shouldCreateAlerts) {
					const property = this.$t('student.telefon');
					alert(
						this.$t('alert.should-be-a-number', {
							property,
						})
					);
				}
				break;
			} else if (!!value == false) {
				// TODO: alert component
				foundInvalidInput = true;
				if (shouldCreateAlerts) {
					const property: string = this.$t(
						`student.${studentProperties[key]}`
					) as string;

					alert(
						this.$t('alert.property-invalid', {
							property,
						})
					);
				}
				break;
			}
		}
		return !foundInvalidInput;
	}
}
