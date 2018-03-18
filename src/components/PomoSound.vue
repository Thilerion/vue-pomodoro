<template>
	<audio ref="finishedSound" src="alarm.mp3"></audio>
</template>

<script>
export default {
	computed: {
		isFinished() {
			return this.$store.getters.isTimerFinished;
		}
	},
	watch: {
		isFinished(oldVal, newVal) {
			if (oldVal === true) {
				console.log("Finished!");
				console.log(this.$refs.finishedSound);
				this.$refs.finishedSound.play();
			}
		}
	}
}
</script>

<style>

</style>
