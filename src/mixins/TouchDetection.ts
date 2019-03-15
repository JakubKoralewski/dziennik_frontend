import Vue from 'vue';
import Component from 'vue-class-component';

// You can declare a mixin as the same style as components.
@Component
/** Mixin  */
export default class TouchDetection extends Vue {
	public xDown: number = 0;
	public xSensitivity: number = 5;
	public getTouches(evt: TouchEvent) {
		return (
			evt.touches || (evt as any).originalEvent.touches // browser API
		);
	}
	public handleTouchStart(evt: TouchEvent) {
		const firstTouch = this.getTouches(evt)[0];
		this.xDown = firstTouch.clientX;
	}
	public handleTouchMove(evt: TouchEvent) {
		if (!this.xDown) {
			return;
		}
		const xUp = evt.touches[0].clientX;
		const xDiff = this.xDown - xUp;

		if (xDiff > this.xSensitivity) {
			(this as any).leftSwipe(xDiff);
		} else if (xDiff < -this.xSensitivity) {
			(this as any).rightSwipe(xDiff);
		}
		this.xDown = 0;
	}
}
