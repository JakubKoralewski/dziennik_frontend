export interface IStudent {
	[index: string]: any;
	id: number;
	imie: string;
	nazwisko: string;
	klasa: string;
	telefon: string;
	visible?: boolean;
}
interface IStudentsEditableProperties {
	id?: number;
	imie?: string;
	nazwisko?: string;
	klasa?: string;
	telefon?: number;
}
export interface IStudentsPropertiesRequiringValidation {
	[index: string]: string;
	imie?: string;
	nazwisko?: string;
	klasa?: string;
	/** It's a string, because that what's gotten from the input!  */
	telefon?: string;
}

export interface INewStudent {
	imie: string;
	nazwisko: string;
	klasa: string;
	telefon: string;
	[key: string]: string;
}

export interface IStudents {
	[index: number]: IStudent;
}

export interface IEditData {
	id: string;
	new_properties: IStudentsEditableProperties;
}

export interface IDeleteResponse {
	/** The id   */
	uczen: number;
}

export interface IEditResponse {
	/** New student  */
	uczen: IStudent;
}

export interface IState {
	students: IStudents;
	sideBarVisible: boolean;
	searchText: string;
}
