export default function findId(students: number[]) {
	// newId: https://i.imgur.com/JWBbOsb.png, but https://i.imgur.com/4Fvg0dv.png
	if (students.length === 0) {
		return 0;
	} else if (students.length === 1) {
		if (students[0] === 0) {
			return 1;
		} else {
			return 0;
		}
	} else if (students.length === 2) {
		if (students[0] > 0) {
			// [>=1, >=2]
			return 0;
		} else {
			// [0, >0]
			if (students[1] == 1) {
				return 2;
			} else {
				return 1;
			}
		}
	} else {
		for (let i = 1; i < students.length; i++) {
			if (students[i] - students[i - 1] != 1) {
				const firstValue = students[i - 1];
				console.log('firstValue:', firstValue);
				return firstValue + 1;
			}
		}
		if (students[0] > 0) {
			return 0;
		} else {
			return students[students.length - 1] + 1;
		}
	}
	return 'ERROR';
}
