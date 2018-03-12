<template>
	<div class="main">
		<h2>Time:</h2>
		<pomodoro-timer></pomodoro-timer>
		<div>
			<h2>Timer info</h2>
			<button @click="showTimerInfo = !showTimerInfo">Show/hide</button>
		</div>
		<div v-show="showTimerInfo">
			<h2>Durations:</h2>
			<ul>
				<li>Focus: <span>{{$store.state.durations.focus}}</span></li>
				<li>Short break: <span>{{$store.state.durations.short}}</span></li>
				<li>Long break: <span>{{$store.state.durations.long}}</span></li>
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

</style>
