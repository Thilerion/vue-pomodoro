<template>
	<audio ref="finishedSound" src="alarm.mp3"></audio>
</template>

<script>
export default {
	data() {
		return {
			interval: null
		}
	},
	computed: {
		isFinished() {
			return this.$store.getters.isTimerFinished;
		},
		soundEnabled() {
			return this.$store.getters.soundEnabled;
		},
		nextSessionNotYetStarted() {
			return this.$store.getters.isTimerFinished || !this.$store.getters.sessionStarted;
		}
	},
	methods: {
		startAlarmInterval() {
			this.interval = setInterval(() => {
				if (this.soundEnabled === false || !this.nextSessionNotYetStarted) {
					console.log(this.nextSessionNotYetStarted);
					clearInterval(this.interval);
					this.interval = null;
				} else {
					this.playAlarm();
				}
			}, 10000);
		},
		playAlarm() {
			this.$refs.finishedSound.play();
		}
	},
	watch: {
		isFinished(oldVal, newVal) {
			if (oldVal === true) {
				console.log("Finished!");
				if (this.soundEnabled === true) {
					this.playAlarm();
					this.startAlarmInterval();
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
