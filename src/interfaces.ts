export interface IStudent {
	id: number;
	imie: string;
	nazwisko: string;
	klasa: string;
	telefon: number;
	visible?: boolean;
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
