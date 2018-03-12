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
		
	},
	actions: {
	
	},
	mutations: {
		
	}
});

const formatDuration = (duration, formatting) => {
	return moment.utc(moment.duration(duration).asMilliseconds()).format(formatting);
}