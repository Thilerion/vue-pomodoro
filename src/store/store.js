import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import moment from 'moment';
moment.locale('nl');

import Session from '@/constructors/session';

export const store = new Vuex.Store({
	state: {
		durations: {
			focus: 4000,
			short: 2000,
			long: 3000
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
		sessionsPerCycle: 2,
		sessionHistory: [[]],
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
			let t = Math.max(getters.timeRemainingSeconds, 0);
			return formatDuration(t, "mm:ss");
		},
		nextTimeoutDuration(state, getters) {
			let normalTime = 1000; //ms
			let roundedDiff = getters.timeRemaining - getters.timeRemainingSeconds;
			let nextDelay = normalTime + roundedDiff;
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
		},
		logSession(state, sesLog) {
			let sesLogNew = Object.assign({}, sesLog);
			let lastCycle = state.sessionHistory.length - 1;
			state.sessionHistory[lastCycle].push(sesLogNew);
		},
		nextSession(state) {
			state.sessionNumber += 1;
		},
		nextCycle(state) {
			state.sessionNumber = 0;
			state.sessionHistory.push([]);
		}
	},
	actions: {
		initializeTimer({ state, commit, dispatch }) {
			if (state.initialized === true) return;
			dispatch('initNewSession');
			commit('setInitialized');
			console.log("Timer initialize complete.");
		},
		initNewSession({getters, state, commit}) {
			let nextSessionType = getters.cycleArray[state.sessionNumber];
			let nextSessionDur = state.durations[nextSessionType];
			let nextSessionObject = new Session(nextSessionType, nextSessionDur);
			commit('setNewCurrentSession', nextSessionObject);
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
				if (getters.timeRemaining <= 0) {
					dispatch('timerFinished');
				} else {
					dispatch('runInterval');
				}				
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
		},
		timerFinished({state, commit, dispatch}) {
			commit('setTimerState', { running: false, finished: true });
			dispatch('stopInterval');
			dispatch('createSessionLog');
			if (state.currentSession.sessionType === "long") {
				commit('nextCycle');
			} else {
				commit('nextSession');
			}			
			dispatch('initNewSession');
		},
		createSessionLog({ state, commit, getters }) {
			let cur = state.currentSession;
			let sesLog = {
				sessionType: cur.sessionType,
				pauses: cur.pauses.length,
				pausesLength: getters.pausesLength,
				duration: cur.duration,
				startTime: cur.startTime,
				endTime: cur.lastTick,
				finished: cur.state.finished
			}
			commit('logSession', sesLog);
		}
	}	
});

const formatDuration = (duration, formatting) => {
	return moment.utc(moment.duration(Math.floor(duration /1000) * 1000).asMilliseconds()).format(formatting);
}