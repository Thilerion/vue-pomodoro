<template>
	<div class="button-container">
		<button id="reset-timer" class="state-button small"><i class="material-icons">replay</i></button>
		<button id="start-timer" class="state-button large"><i class="material-icons" @click="mainActionButton">{{mainActionIcon}}</i></button>
		<button id="skip-timer" class="state-button small"><i class="material-icons">skip_next</i></button>
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
		}
	},
	computed: {
		startPauseResume() {
			if (this.sessionState.finished === true) {
				return;
			} else if (this.sessionState.started === false) {
				return 'startTimer';
			} else if (this.sessionState.running === false) {
				return 'resumeTimer';
			} else {
				return 'pauseTimer';
			}
		},
		sessionState() {
			return this.$store.state.currentSession.state;
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
		padding: 0 2rem;
	}

	.state-button {
		border: none;
		margin: 0 0.8rem;
		background: none;
	}

	.state-button.large {
		opacity: 0.85;
	}

	.state-button.small {
		opacity: 0.7;
	}
	
	.state-button i {
		margin: calc(.7rem + 5px) .7rem;
	}

	.state-button.large i {
		font-size: 4.5rem;
	}
</style>
