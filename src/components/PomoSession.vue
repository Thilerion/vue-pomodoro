<template>
	<div class="session-view">
		<div class="session-name">
			{{currentSessionType}}
		</div>
		<div class="session-number">
			<pomo-session-circle class="session-item" v-for="(session, index) in sessionStatesFocus" :key="index" :finished="isFinished(index)" :started="isStarted(index)" :running="isRunning(index)"></pomo-session-circle>
		</div>
	</div>
</template>

<script>
import PomoSessionCircle from './PomoSessionCircle'
export default {
	components: {
		PomoSessionCircle
	},
	computed: {
		sessionStates() {
			return this.$store.getters.currentCycleSessionStates;
		},
		sessionStatesFocus() {
			return this.$store.getters.focusSessionStates;
		},
		currentSessionType() {
			return this.$store.state.currentSession.sessionType;
		}
	},
	methods: {
		isFinished(index) {
			return this.sessionStatesFocus[index].finished;
		},
		isStarted(index) {
			return this.sessionStatesFocus[index].started;
		},
		isRunning(index) {
			return this.sessionStatesFocus[index].running;
		}
	}
}
</script>

<style scoped>
.session-name {
	font-size: 1.3rem;
	border: 2px 0 2px 0 solid;
	text-transform: capitalize;
}

.session-number {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 25px;
}
</style>
