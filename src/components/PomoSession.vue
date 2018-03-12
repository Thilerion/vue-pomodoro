<template>
	<div class="session-view">
		<div class="session-name">
			{{sessionView}}
		</div>
		<div class="session-number">
			<div class="session-item" v-for="session in sessionsInCycle" :key="session"></div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		sessionView() {
			return this.$store.state.currentSession;
		},
		sessionsInCycle() {
			return this.$store.state.focusSessionsBeforeLong;
		}
	}
}
</script>

<style scoped>
.session-view {
	font-style: italic;
}

.session-number {
	display: flex;
	justify-content: center;
}

.session-item {
	height: 6px;
	width: 6px;
	border-radius: 50%;
	border: 1px solid;
	margin: 0 0.2rem;
}
</style>
