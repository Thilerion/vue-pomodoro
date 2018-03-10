<template>
	<div class="flashing-bg" :class="animationClass">

	</div>
</template>

<script>
export default {
	computed: {
		endOfSessionReached() {
			return this.$store.state.endOfSession;
		},
		animationClass() {
			if (this.endOfSessionReached) return 'animate';
			else return 'dont-animate';
		}
	}
}
</script>

<style>
.flashing-bg {
	height: 100%;
	width: 100%;
	position: fixed;
	left: 0;
	top: 0;
	z-index: -1;
	
}

.animate {
	animation: 5s alarm-background infinite alternate;
}

.dont-animate {
	animation: none;
	background-color: white;
}

@keyframes alarm-background {
	from {
		background: rgb(255, 0, 0);
	}
	to {
		background: white;
	}
}
</style>
