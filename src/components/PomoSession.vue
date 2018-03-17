<template>
		<div class="session-name">
			<span>
				{{currentSessionName}}
			</span>
		</div>
</template>

<script>
export default {
	computed: {
		currentSessionName() {
			return this.$store.getters.currentSessionName;
		}
	}
}
</script>

<style scoped>
.session-name {
	font-size: 1.3rem;
	border: 2px 0 2px 0 solid;
	text-transform: capitalize;
	display: flex;
}

.session-name span {
	margin: auto;
}
</style>
