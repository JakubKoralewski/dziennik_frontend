export default {
	data() {
		return {
			xDown: null,
			yDown: null,
			xSensitivity: 5,
		};
	},
	methods: {
		getTouches(evt) {
			return (
				evt.touches || evt.originalEvent.touches // browser API
			); // jQuery
		},
		handleTouchStart(evt) {
			const firstTouch = this.getTouches(evt)[0];
			this.xDown = firstTouch.clientX;
			this.yDown = firstTouch.clientY;
		},
		handleTouchMove(evt) {
			if (!this.xDown || !this.yDown) {
				return;
			}
			const xUp = evt.touches[0].clientX;
			const xDiff = this.xDown - xUp;

			if (xDiff > this.xSensitivity) {
				this.leftSwipe(xDiff);
			} else if (xDiff < -this.xSensitivity) {
				this.rightSwipe(xDiff);
			}
			this.xDown = null;
			this.yDown = null;
		},

	},
};