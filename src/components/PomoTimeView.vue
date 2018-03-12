<template>
	<div class="time-view">
		<div class="time-display">
			{{timeRemainingDisplay}}
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		timeRemainingDisplay() {
			return this.$store.getters.timeRemainingFormat;
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
