import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Session from '@/constructors/session';
import formatDuration from '@/utils/format-duration';
import {minToMs} from '@/utils/time-utils';

const sessionTypes = {
	focus: "Focus",
	short: "Short break",
	long: "Long break"
};

export const store = new Vuex.Store({
	strict: true,
	state: {
		settings: {
			durations: {
				focus: minToMs(25),
				short: minToMs(5),
				long: minToMs(20)
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
		timeoutId: null,
		currentSession: new Session()
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
		currentSessionTimePassed: state => state.lastTick - state.startTime,
		currentSessionTimeRemaining: (state, getters) => state.currentSession.duration - getters.currentSessionTimePassed + getters.currentSessionTimePaused
	},
	mutations: {
		setNewSession(state, sessionObj) {
			state.cyclesObj[state.cycleId][state.sessionId] = Object.assign({}, state.cyclesObj[state.cycleId][state.sessionId], sessionObj);
			console.log(state.cyclesObj[state.cycleId][state.sessionId]);
		},
		setInitialized: state => state.initialized = true,
		setNewCycle: state => state.cycles.push([]),
		updateSession: (state, { updatedValues, s, c }) => {
			let updated = { ...state.cycles[c][s], ...updatedValues };
			state.cycles[c].splice(s, 1, updated);
		},
		addSessionId: state => {
			if (state.sessionId == null) state.sessionId = 0;
			else state.sessionId += 1;
		}
	},
	actions: {
		initializeTimer({ state, dispatch, commit }) {
			if (state.initialized === true) return;
			dispatch('initNewSession');
			commit('setInitialized');
		},
		createNewSession({ state, commit, getters }) {
			let n = getters.nextSessionName;
			let d = getters.sessionTypeDuration(n);
			let sess = new Session(n, d);
			commit('setNewSession', sess);
		},
		initNewSession({ getters, dispatch, commit }) {
			if (getters.isCycleFinished === true) {
				commit('setNewCycle');
			}
			dispatch('createNewSession');
			commit('addSessionId');
		},
		startTimer({ state, getters, commit, dispatch }) {
			let s = getters.currentSessionId, c = getters.currentCycleId;
			let updatedValues = { started: true, running: true, startTime: Date.now(), lastTick: Date.now() };
			commit('updateSession', { updatedValues, c, s });
			dispatch('timerTick');
			//dispatch('runInterval');
		},
		timerTick({getters, commit}) {
			let s = getters.currentSessionId, c = getters.currentCycleId;
			let updatedValues = { lastTick: Date.now() };
			commit('updateSession', {updatedValues, c, s})
		},
		pauseTimer() {

		},
		resumeTimer() {

		},
		resetTimer() {

		},
		timerFinished() {

		}
	}	
});

const pauseReducer = (acc, val) => {
	if (val.end === null) return (Date.now() - val.start) + acc;
	else return (val.end - val.start) + acc;
}

//DEBUG TEST ARRAY
/*
setInterval(() => {
	store.dispatch('initializeTimer');
	store.dispatch('initNewSession');
}, 2000);

/*
//DEBUG START TIMER

setTimeout(() => {
	store.dispatch('startTimer');
}, 500)

setInterval(() => {
	store.dispatch('timerTick');
}, 1000);
*/