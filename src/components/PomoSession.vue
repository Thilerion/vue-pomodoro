<template>
		<div class="session-name">
			{{currentSessionType}}
		</div>
</template>

<script>
export default {
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
