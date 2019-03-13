/* interface IData {
	xDown: number;
	yDown: number;
}

interface IMethods {
	getTouches(evt: TouchEvent): MouseEvent[];
	handleTouchStart(evt: TouchEvent): void;
	handleTouchMove(evt: TouchEvent): void;
} */

export default {
	data() {
		return {
			xDown: null,
			yDown: null,
			xSensitivity: 20,
		};/*  as IData; */
	},
	mounted() {
		document.addEventListener(
			'touchstart',
			(this as any).handleTouchStart,
			false
		);
		document.addEventListener(
			'touchmove',
			(this as any).handleTouchMove,
			false
		);
	},
	methods: {
		getTouches(evt: TouchEvent) {
			return (
				evt.touches || evt.originalEvent.touches // browser API
			); // jQuery
		},
		handleTouchStart(evt: TouchEvent) {
			const firstTouch = (this as any).getTouches(evt)[0];
			(this as any).xDown = firstTouch.clientX;
			(this as any).yDown = firstTouch.clientY;
		},
		handleTouchMove(evt: TouchEvent) {
			if (!(this as any).xDown || !(this as any).yDown) {
				return;
			}

			const xUp = evt.touches[0].clientX;
			const yUp = evt.touches[0].clientY;

			const xDiff = (this as any).xDown - xUp;
			const yDiff = (this as any).yDown - yUp;

			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				/*most significant*/
				if (xDiff > (this as any).xSensitivity) {
					/* left swipe */
					console.log('left swipe');
				} else {
					/* right swipe */
					console.log('right swipe');
				}
			} else {
				if (yDiff > 0) {
					/* up swipe */
					console.log('up swipe');
				} else {
					/* down swipe */
					console.log('down swipe');
				}
			}
			/* reset values */
			(this as any).xDown = null;
			(this as any).yDown = null;
		},
	},
};
