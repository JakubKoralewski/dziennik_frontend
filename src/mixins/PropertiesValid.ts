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

export type IPropertiesValid = (
	student: IStudentsPropertiesRequiringValidation
) => string | boolean;

/** Provides a propertiesValid method.  */
@Component
export class PropertiesValid extends Vue {
	/** Gets a student object.
	 *  Creates alerts saying which property is bad.
	 *  Returns true if all properties valid else false.
	 */
	propertiesValid(
		student: IStudentsPropertiesRequiringValidation
	): string | boolean {
		for (const key of Object.keys(student)) {
			const value = student[key];
			if (key === 'id') {
				continue;
			} else if (key === 'telefon' && isNaN(value as any)) {
				let property: string = this.$t(
					'student.phone-number-genitive'
				) as string;
				property = property.toLowerCase();
				return this.$t('alert.should-be-a-number', {
					property,
				}) as string;
			} else if (!!value == false) {
				const property: string = this.$t(
					`student.${studentProperties[key]}`
				) as string;

				return this.$t('alert.property-invalid', {
					property,
				}) as string;
			}
		}
		return true;
	}
}
