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
			console.log(this.tween, this.nextSessionLength);
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
			new TWEEN.Tween({tweeningValue: startValue})
			.to({tweeningValue: endValue}, 1500)
			.onUpdate(function (object) {
				vm.tweenedNumber = object.tweeningValue.toFixed(0)
			})
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
	font-size: 15vmin;
	letter-spacing: 0.15rem;
}
</style>
