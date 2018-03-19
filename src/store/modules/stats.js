// initial state
const state = {
	history: [[]]
};

import merge from 'deepmerge';

// getters
const getters = {
	history: state => state.history,
	currentCycleHistory: (state, getters, rootState, rootGetters) => state.history[rootGetters.currentCycleId],
	sessionHistoryStats: state => cycle => {
		const cycleHistory = clone(state.history[cycle]);
		const accumulator = clone(sessionStatsDefault);

		cycleHistory.forEach((val) => {
			let type = val.type;
			accumulator[type].totalSessions += 1;

			if (val.reset === true) accumulator[type].resets += 1;
			else if (val.skipped === true) accumulator[type].skipped += 1;
			else accumulator[type].completed += 1;

			accumulator[type].totalTime += val.totalTime;
			accumulator[type].totalPauseTime += val.pausesTotalLength;
			accumulator[type].pausesAmount += val.pausesAmount;
		});
		return accumulator;
	},
	sessionHistoryStatsPerCycle: (state, getters) => {
		let times = state.history.length;
		let arr = [];
		for (let i = 0; i < times; i++) {
			arr.push(clone(getters.sessionHistoryStats(i)));
		}
		return arr;
	},
	totalSessionHistoryStats: (state, getters) => {
		let perCycle = clone(getters.sessionHistoryStatsPerCycle);
		let total = { ...sessionStatsDefault.focus, ...{focusSessions: 0, longSessions: 0, shortSessions: 0, totalCycles: 0, totalFocusTime: 0, totalBreakTime: 0} };
		for (let i = 0; i < perCycle.length; i++) {
			//for each cycle
			total.totalCycles += 1;
			for (let key in perCycle[i]) {
				//for each session type in that cycle
				if (key === "focus") {
					total.totalFocusTime += perCycle[i][key].totalTime;
				} else if (key === "short" || key === "long") {
					total.totalBreakTime += perCycle[i][key].totalTime;
				}
				for (let item in perCycle[i][key]) {
					//for each statistic from that session type
					total[item] += perCycle[i][key][item];					
					if (item === "totalSessions") {
						console.log(item);
						let s = `${key}Sessions`;
						total[s] += perCycle[i][key][item];
					}
					
				}
			}
		}
		console.log(total);
		return total;
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
			} else if (val.end == null) {
				return acc + (Date.now() - val.start);
			} else return acc;
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

const sessionStatsDefault = {
	focus: {
		totalSessions: 0,
		completed: 0,
		resets: 0,
		skipped: 0,
		totalTime: 0,
		totalPauseTime: 0,
		pausesAmount: 0
	},
	short: {
		totalSessions: 0,
		completed: 0,
		resets: 0,
		skipped: 0,
		totalTime: 0,
		totalPauseTime: 0,
		pausesAmount: 0
	},
	long: {
		totalSessions: 0,
		completed: 0,
		resets: 0,
		skipped: 0,
		totalTime: 0,
		totalPauseTime: 0,
		pausesAmount: 0
	}
}

const clone = obj => JSON.parse(JSON.stringify(obj));
