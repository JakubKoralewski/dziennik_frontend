export interface IStudent {
	[index: string]: any;
	id: number;
	imie: string;
	nazwisko: string;
	klasa: string;
	telefon: number;
	visible?: boolean;
}
interface IStudentsEditableProperties {
	id?: number;
	imie?: string;
	nazwisko?: string;
	klasa?: string;
	telefon?: number;
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
