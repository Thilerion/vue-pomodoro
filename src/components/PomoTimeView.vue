<template>
	<div class="time-view">
		<div class="time-display">
			{{timeDisplay}}
		</div>
	</div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'
import formatDuration from '@/utils/format-duration';

export default {
	computed: {
		timeRemaining() {
			return this.$store.getters.timeRemainingFormatted;
		},
		currentSessionFinished() {
			return this.$store.getters.currentState.finished;
		},
		timeDisplay() {
			if (this.currentSessionFinished === false) {
				return this.timeRemaining;
			} else {
				return this.tweenedDisplay;
			}
		},
		nextSessionLength() {
			return this.$store.getters.nextSessionLength;
		},
		tweenedDisplay() {
			return formatDuration(this.tweenedNumber, "mm:ss");
		}
	},
	watch: {
		currentSessionFinished(newVal, oldVal) {
			if (newVal === true) {
				this.tween(0, this.nextSessionLength);
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
			let tweenLength = (endValue - startValue) / 475;
			let adjTweenLength = Math.min(Math.max(tweenLength, 0), 750);
			if (adjTweenLength < 100) adjTweenLength = 0;
			new TWEEN.Tween({tweeningValue: startValue})
			.to({tweeningValue: endValue}, adjTweenLength)
			.onUpdate(function (object) {
				vm.tweenedNumber = object.tweeningValue.toFixed(0)
			})
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onComplete(function() {
				console.log("Tween complete!");
				vm.$store.dispatch('loadNextSession');
			})
			.start()

			animate()
		}
	},
	data() {
		return {
			tweenedNumber: 0
		}
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
</style>
