<template>
	<div class="time-view">
		<div class="time-display">
			{{timeRemaining}}
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		timeRemaining() {
			return this.$store.getters.timeRemainingFormatted;
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
