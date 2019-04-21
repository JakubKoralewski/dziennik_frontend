export interface IStudent {
	[index: string]: any;
	id: string;
	first_name: string;
	last_name: string;
	class: string;
	phone_number: string;
	visible?: boolean;
}
interface IStudentsEditableProperties {
	id?: number;
	first_name?: string;
	last_name?: string;
	class?: string;
	phone_number?: number;
}
export interface IStudentsPropertiesRequiringValidation {
	[index: string]: string;
	first_name?: string;
	last_name?: string;
	class?: string;
	/** It's a string, because that what's gotten from the input!  */
	phone_number?: string;
}

export interface INewStudent {
	first_name: string;
	last_name: string;
	class: string;
	phone_number: string;
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
	student: number;
}

export interface IEditResponse {
	/** New student  */
	student: IStudent;
}

export interface IState {
	students: IStudents;
	sideBarVisible: boolean;
	searchText: string;
	currentEdits: string[];
	viewportBelow500: boolean;
	isSearchWrapped: boolean;
	areStudentsLoaded: boolean;
}
