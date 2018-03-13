<template>
	<div :class="circleClass">

	</div>
</template>

<script>
export default {
	props: ["finished", "started", "running"],
	computed: {
		circleClass() {
			if (this.finished === true) {
				return "finished";
			} else if (this.started === true && this.running === true) {
				return "active";
			} else if (this.started === true && this.running === false) {
				return ["active", "paused"];
			} else {
				return "inactive";
			}
		}
	}
}
</script>

<style scoped>
.session-item {
	height: 6px;
	width: 6px;
	border-radius: 50%;
	margin: 0 5px;
	border: 3px solid;
	transition: all 0.7s ease;
}

.inactive {
	opacity: 0.3;
}

.active {
	opacity: 1;
	transform: scale(1.4);
}

.paused {
	animation: 1.5s infinite alternate pulsate;
}

.finished {
	opacity: 1;
}

@keyframes pulsate {
	0% {
		opacity: 1;
		transform: scale(1.4);
	}
	100% {
		opacity: 0.6;
		transform: scale(1.2);
	}
}


</style>
