<template>
	<div class="time-view">
		<div class="time-display">
			{{timeDisplay | formatDuration}}
		</div>
	</div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'
import formatDuration from '@/utils/format-duration';

export default {
	computed: {
		timeRemaining() {
			return this.$store.getters.currentSessionTimeRemaining;
		},
		runTween() {
			return this.$store.getters.runTween;
		},
		tweenTo() {
			return this.$store.getters.runTweenTo;
		},
		timeDisplay() {
			let display;
			if (this.runTween === false) {
				display = Math.round(this.timeRemaining / 1000) * 1000;
			} else if (this.runTween === true) {
				display = Math.round(this.tweenedNumber / 1000) * 1000;
			}
			return Math.max(-50, display);
		}
	},
	watch: {
		runTween(newVal, oldVal) {
			if (newVal === true) {
				let from = Math.max(0, this.timeRemaining);
				console.log(from, this.tweenTo);
				this.tween(from, this.tweenTo);
			}
		}
	},
	methods: {
		tween: function (startValue, endValue) {
			var vm = this;
			function animate() {
				if (TWEEN.update()) {
					requestAnimationFrame(animate);
				}
			}
			let x = (endValue - startValue);
			let tweenLength = 1.1*((x*Math.sqrt(x))/x );
			console.log("Calculated tween length: " + tweenLength);
			let adjTweenLength = Math.floor(Math.min(Math.max(tweenLength, 500), 1500));
			console.log("Tween length: " + adjTweenLength);
			new TWEEN.Tween({tweeningValue: startValue})
			.to({tweeningValue: endValue}, adjTweenLength)
			.onUpdate(function (object) {
				vm.tweenedNumber = object.tweeningValue.toFixed(0)
			})
			.easing(TWEEN.Easing.Quadratic.In)
			.onComplete(function() {
				console.log("Tween complete!");
				vm.$store.dispatch('finishTween');
			})
			.start()

			animate()
		}
	},
	data() {
		return {
			tweenedNumber: 0
		}
	},
	filters: {
		formatDuration
	}
}
</script>

<style scoped>
.time-view {
	display: flex;
	justify-content: center;
	align-items: center;
}

.time-display {
	font-family: "Crimson Text", serif; 
	font-size: 26vmin;
	font-family: "Source Sans Pro", sans-serif;
	font-weight: 300;
	letter-spacing: 3px;
	line-height: 1;
}

@media (max-height: 400px) {
	.time-display {
		font-size: max(22vmin, 50px);
	}
}

@media (max-height: 250px) {
	.time-display {
		font-size: calc(30px + 10vh);
	}
}
</style>
