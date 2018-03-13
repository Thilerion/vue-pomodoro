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
	border: 1px solid;
	transition: all 0.5s ease;
	opacity: 0.8;
}

.inactive {
	opacity: 0.5;
}

.active {
	opacity: 1;
	transform: scale(1.4);
}

.paused {
	opacity: 0.6;
	animation: 1.2s infinite alternate pulsate;
	animation-delay: 0.5s;
}

.finished {
	background-color: black;
}

@keyframes pulsate {
	0% {
		opacity: 0.6;
	}
	50% {
		opacity: 0.6;
	}
	100% {
		opacity: 0.2;
	}
}


</style>
