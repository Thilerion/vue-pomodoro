<template>
	<div>
		<p class="time-display">{{$store.getters.timeRemainingFormat}}</p>
		<progress-bar></progress-bar>
		<button @click="timerAction">{{$store.getters.timerButton}}</button>
		<button @click="timerReset" v-show="timerState.started === true">Reset</button>
		<button @click="timerSkip">Skip session</button>
	</div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar'
export default {
	data() {
		return {
			interval: null
		}
	},
	components: {
		ProgressBar
	},
	methods: {
		timerAction() {
			if (this.timerState.started === false) {
				console.log("start");
				this.$store.commit('start');
				this.runInterval();
			} else if (this.timerState.running === false) {
				console.log("resume");
				this.$store.commit('resume');
				this.runInterval();
			} else if (this.timerState.running === true) {
				console.log("pause");
				this.$store.commit('pause');
				this.stopInterval();
			}
		},
		timerReset() {
			console.log("reset");
			this.$store.commit('reset');
			this.stopInterval();
		},
		runInterval() {
			this.interval = setInterval(() => {
				this.tick();
			}, this.intervalLength)
		},
		stopInterval() {
			clearInterval(this.interval);
		},
		timerSkip() {
			console.log("skip session");
			this.$store.commit('skip');
			this.stopInterval();
		},
		tick() {
			this.$store.commit('timerTick');
			if (this.timerState.running === false) {
				console.log(this.timerState.running);
				this.stopInterval();
			}
		}
	},
	computed: {
		timerState() {
			return this.$store.state.timerState;
		},
		intervalLength() {
			let length = Math.max(40, 1000 / this.$store.state.speed);
			console.log(length);
			return Math.max(length);
		}
	}
}
</script>

<style>
button {
	border-radius: 5px;
	width: 120px;
	height: 40px;
	border: 2px solid darkgreen;
	background-color: rgb(139, 190, 139);
	outline: none;
	cursor: pointer;
	margin-right: 1em;
}

button:hover {
	background-color: darkgreen;
	color: white;
}

.time-display {
	font-size: 4em;
	margin: 10px 0;
	font-weight: bold;
}
</style>
