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
		currentSessionFinished() {
			return this.$store.getters.sessionFinished;
		},
		currentSessionStarted() {
			return this.$store.getters.sessionStarted;
		},
		timeDisplay() {
			if (this.currentSessionFinished === false) {
				return this.timeRemaining;
			} else {
				return this.tweenedNumber;
			}
		},
		nextSessionLength() {
			return this.$store.getters.nextSessionLength;
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
			let x = (endValue - startValue);
			let tweenLength = 1.1*((x*Math.sqrt(x))/x );
			console.log("Calculated tween length: " + tweenLength);
			let adjTweenLength = Math.floor(Math.min(Math.max(tweenLength, 100), 1500));
			console.log("Tween length: " + adjTweenLength);
			new TWEEN.Tween({tweeningValue: startValue})
			.to({tweeningValue: endValue}, adjTweenLength)
			.onUpdate(function (object) {
				vm.tweenedNumber = object.tweeningValue.toFixed(0)
			})
			.easing(TWEEN.Easing.Quadratic.In)
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
</style>
