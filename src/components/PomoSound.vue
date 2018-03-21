<template>
	<audio ref="finishedSound" src="alarm.mp3"></audio>
</template>

<script>
export default {
	computed: {
		isFinished() {
			return this.$store.getters.isTimerFinished;
		},
		playSound() {
			return this.$store.getters.soundEnabled;
		}
	},
	watch: {
		isFinished(oldVal, newVal) {
			if (oldVal === true) {
				console.log("Finished!");
				if (this.playSound === true) {
					console.log(this.$refs.finishedSound);
					this.$refs.finishedSound.play();
				} else {
					console.log("Sound is disabled.");
				}
				
			}
		}
	}
}
</script>

<style>

</style>
