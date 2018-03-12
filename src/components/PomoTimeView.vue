<template>
	<div class="time-view">
		<div class="time-display">
			{{timeDisplay}}
		</div>
	</div>
</template>

<script>
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
				return "Next session length: " + this.nextSessionLengthFormatted;
			}
		},
		nextSessionLengthFormatted() {
			return this.$store.getters.nextSessionLengthFormatted;
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
