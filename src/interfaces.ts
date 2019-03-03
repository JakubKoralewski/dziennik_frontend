export interface IStudent {
	id: number;
	imie: string;
	nazwisko: string;
	klasa: string;
	telefon: number;
	visible?: boolean;
}

export interface IStudents {
	[index: number]: IStudent;
}
