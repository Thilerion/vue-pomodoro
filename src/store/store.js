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
		cycles: [[]],
		cyclesObj: {
			0: {
				0: {
					type: null,
					duration: null,
					pauses: [],
					started: false,
					running: false,
					finished: false,
					startTime: null,
					lastTick: null
				}
			}
		},
		currentSessionId: 0,
		currentCycleId: 0,
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
		sessionTypeDuration: state => sessionName => {
			return state.settings.durations[sessionName] / state.settings.speed;
		},
		sessionName: (state, getters) => sessionId => {
			return getters.cycleArray[sessionId];
		},
		nextSessionId: (state, getters) => {
			return (state.currentSessionId + 1) % state.settings.cycleLength;
		},
		isCycleFinished: (state, getters) => {
			return state.currentSessionId + 1 >= state.settings.cycleLength;
		},
		nextSessionName: (state, getters) => {
			let id;
			if (getters.nextSessionId == null) id = 0;
			else id = getters.nextSessionId;
			return getters.sessionName(id);
		},
		currentSession: (state) => {
			return state.cyclesObj[state.currentCycleId][state.currentSessionId];
		},
		sessionFinished: (state, getters) => {
			return getters.currentSession.finished;
		},
		sessionStarted: (state, getters) => {
			return getters.currentSession.started;
		},
		sessionRunning: (state, getters) => {
			return getters.currentSession.running;
		},
		timePaused: (state, getters) => (session) => {
			let pauses = session.pauses;
			return pauses.reduce((acc, val) => {
				if (val.end === null) {
					return (Date.now() - val.start) + acc;
				};
				return (val.end - val.start) + acc;
			}, 0);
		},
		currentSessionTimePaused: (state, getters) => {
			return getters.timePaused(getters.currentSession);
		},
		currentSessionTimePassed: (state, getters) => {
			let s = getters.currentSession;
			return s.lastTick - s.startTime;
		},
		currentSessionTimeRemaining: (state, getters) => {
			let s = getters.currentSession;
			return s.duration - getters.currentSessionTimePassed + getters.currentSessionTimePaused;
		}
	},
	mutations: {
		setNewSession(state, { sessionObj, cycleId, sessId }) {
			let newObj = {};
			newObj[sessId] = sessionObj;
			state.cyclesObj[cycleId] = Object.assign({}, state.cyclesObj[cycleId], newObj);
			console.log(state.cyclesObj);
		},
		setInitialized: state => state.initialized = true,
		setNewCycle: state => state.cycles.push([]),
		updateSession: (state, { updatedValues, s, c }) => {
			let updated = { ...state.cycles[c][s], ...updatedValues };
			state.cycles[c].splice(s, 1, updated);
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
			let sessId = state.currentSessionId + 1;
			let cycleId = state.currentCycleId;
			let sess = new Session(n, d);
			commit('setNewSession', { sessionObj: sess, cycleId, sessId });
		},
		initNewSession({ getters, dispatch, commit }) {
			if (getters.isCycleFinished === true) {
				commit('setNewCycle');
			}
			dispatch('createNewSession');
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

//DEBUG TEST ARRAY
/*
store.commit('setInitialized');
for (let i = 0; i < 15; i++) {
	store.dispatch('initNewSession');
}
*/
/*
//DEBUG START TIMER

setTimeout(() => {
	store.dispatch('startTimer');
}, 500)

setInterval(() => {
	store.dispatch('timerTick');
}, 1000);
*/