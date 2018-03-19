// initial state
const state = {
	history: [[]]
};

// getters
const getters = {
	history: state => state.history,
	currentCycleHistory: (state, getters, rootState, rootGetters) => state.history[rootGetters.currentCycleId],
	cycleTotalTime: state => cycle => {
		return state.history[cycle].reduce((acc, val) => {
			return acc + val.totalTime;
		}, 0);
	},
	historyTotalTime: (state, getters) => {
		let length = state.history.length;
		let total = 0;
		for (let i = 0; i < length; i++) {
			total += getters.cycleTotalTime(i);
		}
		return total;
	},
	totalTimeWithCurrent: (state, getters, rootState, rootGetters) => {
		return getters.historyTotalTime + rootGetters.currentSessionTimePassed || 0;
	},
	cycleTotalPaused: state => cycle => {
		return state.history[cycle].reduce((acc, val) => {
			return acc + val.pausesTotalLength;
		}, 0);
	},
	historyTotalPaused: (state, getters) => {
		let length = state.history.length;
		let total = 0;
		for (let i = 0; i < length; i++) {
			total += getters.cycleTotalPaused(i);
		}
		return total;
	},
	totalPausedWithCurrent: (state, getters, rootState, rootGetters) => {
		return getters.historyTotalPaused + rootGetters.currentSessionTimePaused || 0;
	}
};

// actions
const actions = {
	
};

// mutations
const mutations = {
	logCurrentSession: (state, cur) => {
		if (cur.lastTick == null) cur.lastTick = Date.now();
		if (cur.startTime == null) cur.startTime = cur.lastTick;
		let pausesLength = cur.pauses.reduce((acc, val) => {
			if (val.end != null && val.start != null) {
				return acc + (val.end - val.start);
			}
		}, 0);
		console.log(pausesLength);
		
		let log = {
			initDuration: cur.duration,
			instantiated: cur.instantiated,
			totalTime: (cur.lastTick) - (cur.startTime),
			pausesAmount: cur.pauses.length,
			pausesTotalLength: pausesLength,
			sessionId: cur.sessionId,
			type: cur.type,
			finished: cur.finished,
			reset: cur.reset,
			skipped: cur.skipped
		}
		state.history[state.history.length - 1].push(JSON.parse(JSON.stringify(log)));
	},
	logNewCycle: state => state.history.push([])
};

export default {
	state,
	getters,
	actions,
	mutations
};
