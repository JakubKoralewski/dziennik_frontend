export const API_URL =
	process.env.NODE_ENV === 'production'
		? 'https://dziennik-rust.herokuapp.com/'
		: '';
