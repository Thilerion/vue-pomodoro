import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Session from '@/constructors/session';
import formatDuration from '@/utils/format-duration';

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
			speed: 1,
			sound: false
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
		currentSessionInitial: {
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
		sessionsPerCycle: 4,
		sessionHistory: [[]],
		timeoutId: null,
		settingsOpen: false
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
			return (state.currentSession.lastTick - state.currentSession.startTime - getters.pausesLength);
		},
		timeRemaining(state, getters) {
			return (state.currentSession.duration - getters.timePassed) * state.settings.speed;
		},
		timeRemainingSeconds(state, getters) {
			return Math.ceil(getters.timeRemaining / 1000) * 1000;
		},
		timeRemainingFormatted(state, getters) {
			let t = Math.max(getters.timeRemainingSeconds, 0);
			return formatDuration(t, "mm:ss");
		},
		nextTimeoutDuration(state, getters) {
			if (state.settings.speed !== 1) {
				return Math.round(Math.max(1000 / (state.settings.speed/Math.sqrt(8* state.settings.speed)), 50));
			} 
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
		},
		currentState(state) {
			return state.currentSession.state;
		},
		nextSessionLength(state, getters) {
			return state.durations[getters.nextSessionType];
		},
		nextSessionType(state) {
			if (state.currentSession.sessionType === "long") return "focus";
			else if (state.currentSession.sessionType === "short") return "focus";
			else {
				let nxt = (state.sessionNumber + 1);
				if (nxt === state.sessionsPerCycle * 2) return "long";
				else return "short";
			}
		},
		currentCycle(state, getters) {
			let history = state.sessionHistory[state.sessionHistory.length - 1].slice();
			history.push(Object.assign({}, state.currentSession));
			for (let i = history.length; i < getters.cycleArray.length; i++) {
				let nObj = {
					sessionType: getters.cycleArray.slice()[i],
					state: {
						finished: false,
						running: false,
						started: false
					}
				}
				history.push(Object.assign({}, nObj));
			}
			return history.slice();
		},
		currentCycleSessionStates(state, getters) {
			let curCycle = getters.currentCycle.slice();
			let reduced = curCycle.reduce(function (acc, cur) {
				let sess = {
					sessionType: cur.sessionType,
					started: cur.state.started,
					running: cur.state.running,
					finished: cur.state.finished
				}
				if (sess.finished === true) {
					sess.started = true;
					sess.running = false;
				}
				let deepCopySess = Object.assign({}, sess);
				return [...acc, deepCopySess];
			}, []);
			return reduced;
		},
		focusSessionStates(state, getters) {
			let arr = getters.currentCycleSessionStates;
			return arr.filter(sess => sess.sessionType === "focus");
		},
		settings(state) {
			return {
				autoPlay: state.settings.autoPlay,
				speed: state.settings.speed,
				durFocus: state.durations.focus / 60000,
				durShort: state.durations.short / 60000,
				durLong: state.durations.long / 60000,
				sessionsPerCycle: state.sessionsPerCycle,
				sound: state.settings.sound
			}
		}
	},
	mutations: {
		setInitialized(state) {
			state.initialized = true;
		},
		setNewCurrentSession(state, sessionObject) {
			state.currentSession = Object.assign({}, state.currentSession, sessionObject);
			state.currentSessionInitial = Object.assign({}, state.currentSession);
		},
		resetSession(state) {
			let pauses = [];
			let init = Object.assign({}, state.currentSessionInitial);
			init.pauses = pauses;
			state.currentSession = Object.assign({}, init);
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
			clearTimeout(state.timeoutId);
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
		},
		toggleSettings(state) {
			state.settingsOpen = !state.settingsOpen;
		},
		saveSettings(state, s) {
			console.log("Settings received!");
			console.log(s);
			
			state.settings.autoPlay = s.autoplay;
			state.settings.speed = s.speed;
			state.settings.sound = s.sound;
			state.durations.focus = s.durFocus;
			state.durations.short = s.durShort;
			state.durations.long = s.durLong;
			state.sessionsPerCycle = s.sessionsPerCycle;
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
			let nextSessionDur = state.durations[nextSessionType] / state.settings.speed;
			let nextSessionObject = new Session(nextSessionType, nextSessionDur);
			commit('setNewCurrentSession', nextSessionObject);
		},
		resetSession({ state, commit, dispatch }) {
			commit('clearTimeout');
			commit('resetSession');
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
		pauseTimer({ state, commit, dispatch }) {
			if (state.currentSession.state.running === false) return;
			commit('setTimerState', { running: false });
			commit('addPause');
			commit('timerTick');
			dispatch('stopInterval');
		},
		timerFinished({state, commit, dispatch}) {
			commit('setTimerState', { running: false, finished: true });
			dispatch('stopInterval');
			//dispatch('createSessionLog');
			//dispatch('loadNextSession');
		},
		loadNextSession({ state, commit, dispatch }) {
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
				state: {
					finished: cur.state.finished
				}				
			}
			commit('logSession', sesLog);
		}
	}	
});
