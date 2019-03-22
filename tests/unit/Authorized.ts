import { shallowMount } from '@vue/test-utils';
import Authorized from '@/views/Authorized.vue';

describe('Authorized.vue', () => {
	test('is a Vue instance', () => {
		const wrapper = shallowMount(Authorized);
		expect(wrapper.isVueInstance()).toBeTruthy();
	});
});
