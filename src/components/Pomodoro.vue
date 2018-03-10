<template>
	<div class="main">
		<h1 class="center-text">Simple Pomodoro</h1>
		<h2>Time:</h2>
		<pomodoro-timer></pomodoro-timer>
		<div class="control-timer-info">
			<h2>Timer info</h2>
			<button @click="showTimerInfo = !showTimerInfo">Show/hide</button>
		</div>
		<div class="timer-info" v-show="showTimerInfo">
			<h2>Durations:</h2>
			<ul class="durations">
				<li>Focus: <span class="right-align">{{$store.state.durations.focus}}</span></li>
				<li>Short break: <span class="right-align">{{$store.state.durations.short}}</span></li>
				<li>Long break: <span class="right-align">{{$store.state.durations.long}}</span></li>
			</ul>
			<h2>Current session:</h2>
			<p>{{$store.state.currentSession | capitalize}}</p>
			<p>{{$store.getters.timerStateString}}</p>
		</div>
	</div>
</template>

<script>
import PomodoroTimer from '@/components/PomodoroTimer'

export default {
	components: {
		PomodoroTimer
	},
	filters: {
		capitalize(value) {
			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	},
	data() {
		return {
			showTimerInfo: true
		}
	}
}
</script>

<style scoped>
	.main {
		width: 80%;
		max-width: 1000px;
		min-width: 400px;
		margin: auto;
		text-align: left;
	}

	.center-text {
		text-align: center;
	}

	.durations {
		width: 7em;
		position: relative;
		list-style: none;
		padding-left: 0;
	}

	.durations li {
		padding-bottom: 0.3em;
	}

	.durations .right-align {
		position: absolute;
		right: 0;
	}

	.timer-info {
		border: 1px solid lightgrey;
		padding: 0 20px;
	}

	.control-timer-info {
		border: 1px solid lightgrey;
		border-radius: 10px 10px 0 0;
		position: relative;
		margin-top: 20px;
	}

	.control-timer-info button {
		background-color: white;
		border: 1px solid black;
		border-radius: 8px;
		width: auto;
		height: auto;
		padding: 5px;
		position: absolute;
		right: 10px;
		top: 5px;
	}

	.control-timer-info h2 {
		display: inline-block;
		margin: 5px;
	}
</style>
