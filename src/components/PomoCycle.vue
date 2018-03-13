<template>
	<div class="cycle-circles">
		<div :class="circleClass(session)" class="session-item" v-for="(session, index) in focusSessionStates" :key="index"></div>
	</div>	
</template>

<script>
export default {
	computed: {
		focusSessionStates() {
			return this.$store.getters.focusSessionStates;
		}
	},
	methods: {
		circleClass(session) {
			if (session.finished === true) {
				return "finished";
			} else if (session.started === true && session.running === true) {
				return "active";
			} else if (session.started === true && session.running === false) {
				return ["active", "paused"];
			} else {
				return "inactive";
			}
		}
	}
}
</script>

<style scoped>
.cycle-circles {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 25px;
}

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