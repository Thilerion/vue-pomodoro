<template>
	<div class="button-container">
		<button id="reset-timer" @click="resetSession" class="state-button small"><i class="material-icons">replay</i></button>
		<button id="start-timer" class="state-button large"><i class="material-icons" @click="mainActionButton">{{mainActionIcon}}</i></button>
		<button id="skip-timer" @click="skipSession" class="state-button small"><i class="material-icons">skip_next</i></button>
	</div>
</template>

<script>
export default {
	methods: {
		mainActionButton() {
			let action = this.startPauseResume;
			if (action != null) {
				this.$store.dispatch(this.startPauseResume);
			}			
		},
		resetSession() {
			this.$store.dispatch('resetTimer');
		},
		skipSession() {
			this.$store.dispatch('skipTimer');
		}
	},
	computed: {
		startPauseResume() {
			if (this.sessionFinished === true) return;
			else if (this.sessionStarted === false) {
				return 'startTimer';
			} else if (this.sessionRunning === false) {
				return 'resumeTimer';
			} else return 'pauseTimer';
			/*if (this.sessionState.finished === true) {
				return;
			} else if (this.sessionState.started === false) {
				return 'startTimer';
			} else if (this.sessionState.running === false) {
				return 'resumeTimer';
			} else {
				return 'pauseTimer';
			}*/
		},
		sessionRunning() {
			return this.$store.getters.sessionRunning;
		},
		sessionFinished() {
			return this.$store.getters.sessionFinished;
		},
		sessionStarted() {
			return this.$store.getters.sessionStarted;
		},
		mainActionIcon() {
			let action = this.startPauseResume;
			if (action === 'pauseTimer') return "pause";
			else return "play_arrow";
		}
	}
}
</script>

<style scoped>
	.button-container {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.state-button {
		border: none;
		margin: 0 0.8rem;
		background: none;
	}

	.state-button.large {
		opacity: 0.9;
	}

	.state-button.small {
		opacity: 0.8;
	}
	
	.state-button i {
		margin: calc(.7rem + 5px) .7rem;
	}

	.state-button.large i {
		font-size: 4.5rem;
	}
</style>
