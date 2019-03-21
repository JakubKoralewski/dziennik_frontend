import { Vue, Component, Mixins } from 'vue-property-decorator';
import { Sleep } from '@/mixins/Sleep';

interface ITouchRegistration {
	/** Percentage of window's width to trigger swipe.  */
	sensitivity: number;
	leftSwipe: () => void;
	rightSwipe: (xStart: number) => void;
}

// tslint:disable jsdoc-format
/** Mixin, works only for x axis swipes
 *  
 *  Requires these functions to be present on the component to work properly.
```
methods: {
	leftSwipe(evt: Event),
	rightSwipe(evt: Event)
}
```
 */
@Component
export default class TouchDetection extends Mixins(Sleep) {
	public xDown: number = 0;
	public xStart: number = 0;
	/** From options, in percentage */
	public sensitivity: number = 0;
	public leftSwipe: () => void;
	public rightSwipe: (xStart: number) => void;

	public getTouches(evt: TouchEvent): TouchList {
		return evt.touches || (evt as any).originalEvent.touches; // browser API
	}

	public handleTouchStart(evt: TouchEvent) {
		const firstTouch: Touch = this.getTouches(evt)[0];
		this.xDown = firstTouch.clientX;
		this.xStart = firstTouch.clientX;
	}

	public handleTouchEnd(evt: TouchEvent) {
		const touch: Touch = evt.changedTouches[0];
		const moveAmount = touch.clientX - this.xStart;
		const xSensitivity = window.innerWidth * this.sensitivity;
		if (Math.abs(moveAmount) > xSensitivity) {
			/* Is long enough swipe */
			if (moveAmount > 0) {
				console.log('rightswipe');
				this.rightSwipe(this.xStart);
			} else if (moveAmount < 0) {
				console.log('leftswipe');
				this.leftSwipe();
			}
		}
	}

	public touchRegister(options: ITouchRegistration) {
		this.sensitivity = options.sensitivity;
		this.leftSwipe = options.leftSwipe;
		this.rightSwipe = options.rightSwipe;
		document.addEventListener('touchstart', this.handleTouchStart, false);
		document.addEventListener('touchend', this.handleTouchEnd, false);
		document.addEventListener('touchcancel', this.handleTouchEnd, false);
	}
}
