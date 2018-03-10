import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import moment from 'moment';
moment.locale('nl');

export const store = new Vuex.Store({
	state: {
		durations: {
			focus: 25,
			short: 5,
			long: 20
		},
		currentSession: "focus",
		timeRemaining: 25 * 60 * 1000,
		timeFormatting: "mm:ss",
		timerState: {
			running: false,
			started: false
		},
		sessionNumber: 1,
		speed: 1,
		autoPlay: false,
		endOfSession: false
	},
	getters: {
		timeRemainingFormat: state => {
			return moment.utc(moment.duration(state.timeRemaining).asMilliseconds()).format(state.timeFormatting);
		},
		timerStateString(state) {
			if (state.timerState.started === false) {
				return "Nog niet gestart.";
			} else if (state.timerState.running === true) {
				return "Gestart.";
			} else {
				return "Gepauzeerd.";
			}
		},
		timerButton: state => {
			if (state.timerState.started === false) {
				return "Start"
			} else if (state.timerState.running === false) return "Resume"
			else return "Pause"
		},
		percentageRemaining: state => {
			let initial = state.durations[state.currentSession] * 60 * 1000;
			let timePassed = initial - state.timeRemaining;
			return timePassed / initial * 100;
		}
	},
	mutations: {
		start(state) {
			state.timerState.running = true;
			state.timerState.started = true;
			state.endOfSession = false;
		},
		pause(state) {
			state.timerState.running = false;
		},
		resume(state) {
			state.timerState.running = true;
		},
		reset(state) {
			reset(state);
		},
		timerTick(state) {
			state.timeRemaining -= 1000;
			if (state.timeRemaining < 100) {
				nextSession(state);
			}
		},
		skip(state) {
			nextSession(state);
		}
	}
});

function nextSession(state) {
	console.log("End of timer");
	state.endOfSession = true;
	if (state.currentSession === "focus" && state.sessionNumber !== 5) state.currentSession = "short";
	else if (state.currentSession === "short") state.currentSession = "focus";
	else if (state.currentSession === "long") {
		state.currentSession = "focus";
		state.sessionNumber = 0;
	}
	else state.currentSession = "long"; 
	state.sessionNumber += 1;
	console.log(state.sessionNumber);
	reset(state);
}

function reset(state) {
	if (state.autoPlay === false) {
		state.timerState.running = false;
		state.timerState.started = false;
	}	
	state.timeRemaining = state.durations[state.currentSession] * 60 * 1000;
}