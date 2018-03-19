<template>
	<div class="cycle-circles">
		<div :class="circleClass(index)" class="session-item" v-for="(session, index) in cycleFocusSessions" :key="index">
		</div>
	</div>	
</template>

<script>
export default {
	computed: {
		cycleFocusSessions() {
			let allSessions = [...this.$store.getters.cycleArray];
			return allSessions.filter(session => session === "focus").length;
		},
		pastFocusSessions() {
			let allPastSessions = [...this.$store.getters.currentCycleHistory];
			return allPastSessions.filter(session => {
				//let parsed = JSON.parse(JSON.stringify(session));
				return session.type === "focus" && session.finished === true;
			}).reduce((acc, cur) => {
				acc.push("finished");
				return acc;
			}, []);
		},
		pastAndCurrentFocusSession() {
			let past = this.pastFocusSessions;
			let cur = this.$store.getters.currentSession;
			if (cur.type !== "focus" || cur.started !== true) return past;

			let curType;

			if (cur.finished === true) curType = "finished";
			else if (cur.running === true) curType = "active";
			else if (cur.running === false) curType = "paused";
			let pastAndCur = [...past, curType];
			return pastAndCur;
		}
	},
	methods: {
		circleClass(session) {
			if (session >= this.pastAndCurrentFocusSession.length) return "inactive";
			else return this.pastAndCurrentFocusSession[session];
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