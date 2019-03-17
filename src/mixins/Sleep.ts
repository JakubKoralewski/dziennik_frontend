import { Vue, Component } from 'vue-property-decorator';

@Component
export class Sleep extends Vue {
	sleep(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

export type ISleep = (ms: number) => Promise<number>;
