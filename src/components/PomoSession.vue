<template>
	<div class="session-view">
		<div class="session-name">
			focus
		</div>
		<div class="session-number">
			<div class="session-item"></div>
		</div>
	</div>
</template>

<script>
export default {
	
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
