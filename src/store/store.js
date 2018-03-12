import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import moment from 'moment';
moment.locale('nl');

let interval;

export const store = new Vuex.Store({
	state: {
		durations: {
			focus: 25,
			short: 5,
			long: 20
		},
		sessions: ["focus", "short", "long"],
		timeRemaining: 25 * 60 * 1000,
		timeFormatting: "mm:ss",
		timerState: {
			running: false,
			started: false
		},
		sessionInCycle: 0,
		cycleLength: 3,
		endOfSession: false,
		settings: {
			autoPlay: false,
			speed: 1
		}
	},
	getters: {
		timeRemainingFormat: state => {
			return formatDuration(state.timeRemaining, state.timeFormatting);
		},
		currentSession: state => {
			return getCurrentSession(state);
		},
		currentSessionString: state => {
			return state.sessions[getCurrentSession(state)];
		}
	},
	actions: {
		start: ({ commit }) => {
			startInterval();
			let newState = {
				running: true,
				started: true
			};
			commit('setState', newState);
			console.log('Interval started.');			
		},
		pause: ({ commit }) => {
			stopInterval();
			console.log('Interval stopped.');
		}
	},
	mutations: {
		tick(state) {
			state.timeRemaining -= 1000;
		},
		setState(state, payload) {
			state.timerState.running = payload.running;
			state.timerState.started = payload.started;
		}
	}
});

const startInterval = () => {
	interval = setInterval(() => {
		store.commit('tick');
	}, 1000);
}

const stopInterval = () => {
	clearInterval(interval);
}

const getCurrentSession = (state) => {
	if (state.sessionInCycle === 0 || state.sessionInCycle % 2 === 0) {
		//work
		return 0;
	} else if (state.sessionInCycle / 2 === state.cycleLength) {
		//long
		return 2;
	} else {
		//short
		return 1;
	}
}

const formatDuration = (duration, formatting) => {
	return moment.utc(moment.duration(duration).asMilliseconds()).format(formatting);
}