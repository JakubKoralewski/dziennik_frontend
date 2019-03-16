import { Vue, Component } from 'vue-property-decorator';

@Component
export default class PropertiesValid extends Vue {
	sleep(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
