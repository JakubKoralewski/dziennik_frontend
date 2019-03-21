import findId from '@/store/findId';

test('[x,1,x,2] => 0', () => {
	expect(findId([1, 2])).toBe(0);
});

test('[0,1] => 2', () => {
	expect(findId([0, 1])).toBe(2);
});

test('[1,2] => 0', () => {
	expect(findId([1, 2])).toBe(0);
});

test('[0,x,2,3,4] => 1', () => {
	expect(findId([0, 2, 3, 4])).toBe(1);
});
