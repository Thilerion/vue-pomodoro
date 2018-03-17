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
				focus: 3000,//minToMs(25),
				short: 13000,//minToMs(5),
				long: 14000,//minToMs(20)
			},
			autoPlay: false,
			speed: 1,
			sound: false,
			cycleLength: 4, //f s f s f l = 6
			settingsOpen: false
		},
		initialized: false,
		sessionId: null,
		cycleId: 0,
		currentSession: new Session(),
		history: [[]],
		timeoutId: null,
		timeTween: {
			run: false,
			tweenTo: null,
			tweenCallback: null
		}
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
		trueNextSessionId: (state, getters) => {
			if (getters.isCycleFinished === true) return 0;
			else if (getters.currentSessionId == null) return 0;
			else return getters.nextSessionId;
		},
		trueNextSessionName: (state, getters) => getters.sessionName(getters.trueNextSessionId),
		trueNextSessionDuration: (state, getters) => getters.sessionTypeDuration(getters.trueNextSessionName),
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
		isTimerFinished: (state, getters) => getters.currentSessionTimeRemaining <= 10,
		runTween: state => state.timeTween.run,
		runTweenTo: state => state.timeTween.tweenTo,
		runAfterTween: state => state.timeTween.tweenCallback
	},
	mutations: {
		setNewSession(state, { type, dur, id }) {
			state.currentSession = new Session(type, dur, id);
		},
		setSessionId(state, id) {
			if (id != null) state.sessionId = id;
			else state.sessionId += 1;
		},
		setCycleId: state => state.cycleId += 1,
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
		setFinished: state => {
			state.currentSession.finished = true;
			state.currentSession.running = false;
		},
		setReset: state => state.currentSession.reset = true,
		setTimeoutId: (state, intId) => state.timeoutId = intId,
		clearTimeoutId: (state) => {
			clearTimeout(state.timeoutId);
			state.timeoutId = null;
		},
		addPauseStart: state => state.currentSession.pauses.push({ start: Date.now(), end: null }),
		addPauseEnd: state => {
			let currentPause = state.currentSession.pauses.length - 1;
			let pauseObj = state.currentSession.pauses[currentPause].end = Date.now();
		},
		enableTimeTween: state => state.timeTween.run = true,
		disableTimeTween: state => state.timeTween.run = false,
		tweenTo: (state, tweenTo) => state.timeTween.tweenTo = tweenTo,
		setTweenCallback: (state, callback) => state.timeTween.tweenCallback = callback,

		DEBUG_skipToSessionEnd: (state, endStartTime) => state.currentSession.startTime = endStartTime
	},
	actions: {
		initializeTimer({ state, commit, getters }) {
			if (state.initialized === true) return;
			let id = getters.trueNextSessionId;
			let type = getters.trueNextSessionName;
			let dur = getters.sessionTypeDuration(type);
			console.log(id, dur, type);
			commit('setNewSession', { type, dur, id });
			commit('setSessionId', id);
			commit('setInitialized');
		},
		createNewSession({ state, commit, getters }) {
			let id = getters.trueNextSessionId;
			let type = getters.trueNextSessionName;
			let dur = getters.sessionTypeDuration(type);
			commit('setNewSession', { type, dur, id });
			commit('setSessionId', id);
		},
		recreateCurrentSession({getters, commit}) {
			let id = getters.currentSessionId;
			let type = getters.currentSession.type;
			let dur = getters.sessionTypeDuration(type);
			commit('setNewSession', { type, dur, id });
		},
		startNewCycle({commit, getters}) {
			commit('logNewCycle');
			let type = getters.trueNextSessionName;
			let dur = getters.sessionTypeDuration(type);
			commit('setNewSession', { type, dur, id: 0 });
			commit('setSessionId', 0);
			commit('setCycleId');
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
		resetTimer({getters, commit, dispatch}) {
			if (getters.sessionStarted !== true) {
				console.warn("Can't reset a session that hasn't even started yet.");
				return;
			}
			if (getters.sessionFinished === true) {
				console.warn("Session already finished, can't reset now...");
				return;
			}
			if (getters.sessionRunning === true) {
				commit('clearTimeoutId');
				commit('setPaused');
			}
			commit('setReset');

			let dur = getters.currentSession.duration;
			dispatch('runTween', { to: dur, then: "initializeResetCurrentSession" });			
		},
		initializeResetCurrentSession({commit, dispatch}) {
			commit('logCurrentSession');
			dispatch('recreateCurrentSession');
		},
		timerFinished({commit, dispatch, getters}) {
			commit('setFinished');
			commit('clearTimeoutId');
			dispatch('runTween', { to: getters.trueNextSessionDuration, then: "initializeNextSession" });
			//dispatch('initializeNextSession');
		},
		initializeNextSession({ commit, dispatch, getters }) {
			commit('logCurrentSession');
			if (getters.isCycleFinished === true) {
				dispatch('startNewCycle');
			} else {
				dispatch('createNewSession');
			}	
		},
		runTween({ commit }, { to, then }) {
			commit('tweenTo', to);
			commit('setTweenCallback', then);
			commit('enableTimeTween');
		},
		finishTween({commit, dispatch, getters}) {
			dispatch(getters.runAfterTween);
			commit('disableTimeTween');			
			commit('setTweenCallback', null);
			commit('tweenTo', null);			
		}
	}	
});

const pauseReducer = (acc, val) => {
	if (val.end === null) return (Date.now() - val.start) + acc;
	else return (val.end - val.start) + acc;
}

//FOR DEBUGGING, ALSO: DEBUG MUTATION
const debugGoToSessionEnd = (timeDiff) => {
	let lastTick = store.state.currentSession.lastTick;
	let duration = store.state.currentSession.duration;
	let diff = duration - timeDiff;
	let newStartTime = lastTick - diff;
	store.commit('DEBUG_skipToSessionEnd', newStartTime);
}
window.debugGoToSessionEnd = debugGoToSessionEnd;

/*
store.dispatch('initializeTimer');

setInterval(() => {
	store.dispatch('timerFinished');
}, 2000);
*/