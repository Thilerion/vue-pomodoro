<template>
	<div class="session-view">
		
		<div class="session-number">
			<pomo-cycle></pomo-cycle>
		</div>
		<div class="session-name">
			{{currentSessionType}}
		</div>
	</div>
</template>

<script>
import PomoCycle from './PomoCycle'
export default {
	components: {
		PomoCycle
	},
	computed: {
		currentSessionType() {
			return this.$store.state.currentSession.sessionType;
		}
	}
}
</script>

<style scoped>
.session-name {
	font-size: 1.3rem;
	border: 2px 0 2px 0 solid;
	text-transform: capitalize;
	opacity: 0.8;
}
</style>
