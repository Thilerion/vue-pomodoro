import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import moment from 'moment';
moment.locale('nl');

import Session from '@/constructors/session';

export const store = new Vuex.Store({
	state: {
		durations: {
			focus: 25 * (60 * 1000),
			short: 5 * (60 * 1000),
			long: 20 * (60 * 1000)
		},
		sessions: ["focus", "short", "long"],
		initialized: false,
		settings: {
			autoPlay: false,
			speed: 1
		},
		currentSession: {
			sessionType: null,
			duration: null,
			pauses: [],
			state: {
				started: false,
				running: false,
				finished: false
			},
			lastTick: null,
			startTime: null
		},
		sessionNumber: 0,
		sessionsPerCycle: 3,
		timeoutId: null
	},
	getters: {
		cycleArray(state) {
			let arr = [];
			for (let i = 0; i < state.sessionsPerCycle; i++) {
				if (i === state.sessionsPerCycle - 1) {
					arr.push("focus", "long");
				} else {
					arr.push("focus", "short");
				}
			}
			console.log("The cycle array is: " + JSON.stringify(arr));
			return arr;
		},
		timePassed(state, getters) {
			//TODO: add pauses
			return state.currentSession.lastTick - state.currentSession.startTime - getters.pausesLength;
		},
		timeRemaining(state, getters) {
			return state.currentSession.duration - getters.timePassed;
		},
		timeRemainingSeconds(state, getters) {
			return Math.ceil(getters.timeRemaining / 1000) * 1000;
		},
		timeRemainingFormatted(state, getters) {
			return formatDuration(getters.timeRemainingSeconds, "mm:ss");
		},
		nextTimeoutDuration(state, getters) {
			let normalTime = 1000; //ms
			let roundedDiff = getters.timeRemaining - getters.timeRemainingSeconds;
			let nextDelay = normalTime + roundedDiff;
			console.log(nextDelay);
			return nextDelay;
		},
		pausesLength(state) {
			return state.currentSession.pauses.reduce((acc, val) => {
				if (val.pauseEnd === null) {
					return (Date.now() - val.pauseStart) + acc;
				};
				return (val.pauseEnd - val.pauseStart) + acc;
			}, 0);
		}
	},
	mutations: {
		setInitialized(state) {
			state.initialized = true;
		},
		setNewCurrentSession(state, sessionObject) {
			state.currentSession = Object.assign({}, state.currentSession, sessionObject);
		},
		setTimerStartTime(state) {
			state.currentSession.startTime = Date.now();
		},
		setTimerState(state, timerState) {
			state.currentSession.state = Object.assign({}, state.currentSession.state, timerState);
		},
		timerTick(state) {
			state.currentSession.lastTick = Date.now();
		},
		addPause(state) {
			let pauseObj = { pauseStart: Date.now(), pauseEnd: null };
			state.currentSession.pauses.push(pauseObj);
		},
		addPauseEnd(state) {
			let lastIndex = state.currentSession.pauses.length - 1;
			state.currentSession.pauses[lastIndex].pauseEnd = Date.now();
			console.log(state.currentSession.pauses);
		},
		clearTimeout(state) {
			state.timeoutId = null;
		}
	},
	actions: {
		initializeTimer({ state, commit, getters }) {
			if (state.initialized === true) return;
			let nextSessionType = getters.cycleArray[state.sessionNumber];
			let nextSessionDur = state.durations[nextSessionType];
			let nextSessionObject = new Session(nextSessionType, nextSessionDur);

			commit('setNewCurrentSession', nextSessionObject);
			commit('setInitialized');
			console.log("Timer initialize complete.");
		},
		startTimer({ state, commit, dispatch }) {			
			commit('setTimerState', { started: true, running: true });
			commit('setTimerStartTime');
			commit('timerTick');
			dispatch('runInterval');
		},
		runInterval({ state, commit, dispatch, getters }) {
			let delay = getters.nextTimeoutDuration;
			console.log(delay);
			state.timeoutId = setTimeout(() => {
				commit('timerTick');
				dispatch('runInterval');
			}, delay);
		},
		stopInterval({ state, commit }) {
			clearTimeout(state.timeoutId);
			commit('clearTimeout');
		},
		resumeTimer({ commit, dispatch }) {
			commit('setTimerState', { running: true });
			commit('addPauseEnd');
			commit('timerTick');
			dispatch('runInterval');
		},
		pauseTimer({ commit, dispatch }) {
			commit('setTimerState', { running: false });
			commit('addPause');
			commit('timerTick');
			dispatch('stopInterval');
		}
	}	
});

const formatDuration = (duration, formatting) => {
	return moment.utc(moment.duration(Math.floor(duration /1000) * 1000).asMilliseconds()).format(formatting);
}