import { shallowMount } from '@vue/test-utils';
import AddButton from '@/components/AddButton.vue';

describe('AddButton.vue', () => {
	test('is a Vue instance', () => {
		const wrapper = shallowMount(AddButton);
		expect(wrapper.isVueInstance()).toBeTruthy();
	});
});
