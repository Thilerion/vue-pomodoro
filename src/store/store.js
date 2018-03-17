import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Session from '@/constructors/session';
import formatDuration from '@/utils/format-duration';
import { minToMs } from '@/utils/time-utils';

const sessionTypes = {
	focus: "Focus",
	short: "Short break",
	long: "Long break"
};

export const store = new Vuex.Store({
	state: {
		settings: {
			durations: {
				focus: 5000,//minToMs(25),
				short: 2000,//minToMs(5),
				long: 3000,//minToMs(20)
			},
			autoPlay: false,
			speed: 1,
			sound: false,
			cycleLength: 6, //f s f s f l = 6
			settingsOpen: false
		},
		initialized: false,
		sessionId: null,
		cycleId: 0,
		currentSession: new Session(),
		history: [[]],
		timeoutId: null
	},
	getters: {
		cycleArray: state => {
			let arr = [];
			for (let i = 0; i < state.settings.cycleLength; i++) {
				if (i === state.settings.cycleLength - 1) arr.push("long");
				else {
					if (i % 2 === 0) arr.push("focus");
					else arr.push("short");
				}
			}
			return arr;
		},
		sessionTypeDuration: state => sessionName => state.settings.durations[sessionName] / state.settings.speed,
		sessionName: (state, getters) => sessionId => getters.cycleArray[sessionId],
		currentCycleId: state => state.cycleId,
		currentSessionId: state => state.sessionId,
		nextSessionId: (state, getters) => getters.currentSessionId + 1,
		isCycleFinished: (state, getters) => getters.nextSessionId >= state.settings.cycleLength,
		nextSessionName: (state, getters) => getters.sessionName(getters.nextSessionId),
		currentSession: state => state.currentSession,
		sessionFinished: state => state.currentSession.finished,
		sessionStarted: state => state.currentSession.started,
		sessionRunning: state => state.currentSession.running,
		timePaused: (state, getters) => (session) => session.pauses.reduce(pauseReducer, 0),
		currentSessionTimePaused: (state, getters) => getters.timePaused(state.currentSession),
		currentSessionTimePassed: state => (state.currentSession.lastTick - state.currentSession.startTime),
		currentSessionTimeRemaining: (state, getters) => state.currentSession.duration - getters.currentSessionTimePassed + getters.currentSessionTimePaused,
		nextTimeoutDelay: (state, getters) => {
			let flatRemaining = Math.ceil(getters.currentSessionTimeRemaining / 1000) * 1000;
			let diff = getters.currentSessionTimeRemaining - flatRemaining;
			console.log(1000 + diff);
			return 1000 + diff;
		},
		isTimerFinished: (state, getters) => getters.currentSessionTimeRemaining <= 10
	},
	mutations: {
		setNewSession(state, { type, dur, id }) {
			state.currentSession = new Session(type, dur, id);
		},
		setSessionId(state, id) {
			if (id == null) state.sessionId += 1;
			else state.sessionId = id;
		},
		setInitialized: state => state.initialized = true,
		logCurrentSession: state => state.history[state.history.length - 1].push(JSON.stringify(state.currentSession)),
		logNewCycle: state => state.history.push([]),
		timerTick: state => state.currentSession.lastTick = Date.now(),
		setStarted: state => {
			state.currentSession.started = true;
			state.currentSession.running = true;
			state.currentSession.startTime = Date.now();
		},
		setPaused: state => state.currentSession.running = false,
		setResume: state => state.currentSession.running = true,
		setTimeoutId: (state, intId) => state.timeoutId = intId,
		clearTimeoutId: (state) => {
			clearTimeout(state.timeoutId);
			state.timeoutId = null;
		},
		addPauseStart: state => state.currentSession.pauses.push({ start: Date.now(), end: null }),
		addPauseEnd: state => {
			let currentPause = state.currentSession.pauses.length - 1;
			let pauseObj = state.currentSession.pauses[currentPause].end = Date.now();
		}
	},
	actions: {
		initializeTimer({ state, commit, getters }) {
			if (state.initialized === true) return;
			let id = getters.currentSessionId || 0;
			let type = getters.sessionName(id);
			let dur = getters.sessionTypeDuration(type);
			console.log(id, dur, type);
			commit('setNewSession', { type, dur, id });
			commit('setSessionId', id);
			commit('setInitialized');
		},
		createNewSession({ state, commit, getters }) {
			let id = getters.nextSessionId;
			let type = getters.nextSessionName;
			let dur = getters.sessionTypeDuration(type);
			commit('setNewSession', { type, dur, id });
			commit('setSessionId');
		},
		startNewCycle({commit, getters}) {
			commit('logNewCycle');
			let type = getters.sessionName(0);
			let dur = getters.sessionTypeDuration(type);
			commit('setNewSession', { type, dur, id: 0 });
			commit('setSessionId', 0);
		},
		startTimer({ commit, dispatch }) {
			commit('setStarted');
			dispatch('startTimeout');
			commit('timerTick');
		},
		startTimeout({ getters, commit, dispatch }) {
			let delay = getters.nextTimeoutDelay;			
			let timeoutId = setTimeout(() => {
				commit('timerTick');
				if (getters.isTimerFinished === true) {
					dispatch('timerFinished');
				} else dispatch('startTimeout');
			}, delay);
			commit('setTimeoutId', timeoutId);
		},
		pauseTimer({commit}) {
			commit('setPaused');
			commit('clearTimeoutId');			
			commit('timerTick');
			commit('addPauseStart');
		},
		resumeTimer({commit, dispatch}) {
			commit('addPauseEnd');
			commit('setResume');
			dispatch('startTimeout');
			commit('timerTick');
		},
		resetTimer() {

		},
		timerFinished({getters, commit, dispatch}) {
			commit('clearTimeoutId');
			commit('logCurrentSession');
			if (getters.isCycleFinished === true) {
				dispatch('startNewCycle');
			} else {
				dispatch('createNewSession');
			}			
		}
	}	
});

const pauseReducer = (acc, val) => {
	if (val.end === null) return (Date.now() - val.start) + acc;
	else return (val.end - val.start) + acc;
}
/*
store.dispatch('initializeTimer');

setInterval(() => {
	store.dispatch('timerFinished');
}, 2000);
*/