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
			return state.settings.durations[sessionName];
		},
		sessionName: (state, getters) => sessionId => {
			return getters.cycleArray[sessionId];
		},
		currentSessionId: (state, getters) => {
			return state.cycles[getters.currentCycleId].length - 1;
		},
		nextSessionId: (state, getters) => {
			return (getters.currentSessionId + 1) % state.settings.cycleLength;
		},
		isCycleFinished: (state, getters) => {
			return getters.currentSessionId + 1 >= state.settings.cycleLength;
		},
		currentCycleId: (state, getters) => {
			return state.cycles.length - 1;
		},
		nextSessionName: (state, getters) => {
			return getters.sessionName(getters.nextSessionId);
		}
	},
	mutations: {
		setNewSession(state, { sessionObj, cycleId }) {
			state.cycles[cycleId].push(Object.assign({}, sessionObj));
		},
		setInitialized: state => state.initialized = true,
		setNewCycle: state => state.cycles.push([])
	},
	actions: {
		initializeTimer({state, dispatch, commit}) {
			if (state.initialized === true) return;
			dispatch('initNewSession');
			commit('setInitialized');
		},
		createNewSession({state, commit, getters}) {
			let n = getters.nextSessionName;
			let d = getters.sessionTypeDuration(n);
			let cycleId = getters.currentCycleId;
			let sess = new Session(n, d);
			commit('setNewSession', { sessionObj: sess, cycleId: cycleId });
		},
		initNewSession({ getters, dispatch, commit }) {
			if (getters.isCycleFinished === true) {
				commit('setNewCycle');
			}
			dispatch('createNewSession');
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