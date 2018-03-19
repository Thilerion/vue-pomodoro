<template>
<transition name="fade">
		<div class="stats-overlay" v-if="statsOpen">
			<div class="top-bar">
				<div class="center">
					<h2>Statistics</h2>
				</div>
				<div class="right">
					<button class="close-button" @click="toggleStats">
					<svg class="close-icon" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
					</svg>
				</button>
				</div>
				
			</div>
			<div class="main">
				<h3>Current cycle<span> ({{currentCycleProgress}})</span></h3>
				<div class="hr"></div>
				<pomo-cycle-slider class="section-border"></pomo-cycle-slider>
				<div class="hr"></div>
				<h3>Lifetime stats</h3>
				<div class="stats-section">
					<div class="hr-large"></div>
					<h4>Sessions</h4>
					<p>Total: {{historyStats.totalSessions}} / Completed: {{historyStats.completed}}</p>
					<p>Skipped: {{historyStats.skipped}} / Resets: {{historyStats.resets}}</p>
					<div class="hr-margin"></div>
					<p>Time spent focussed: {{historyStats.totalFocusTime | form}}</p>
					<p>Time spent in break: {{historyStats.totalBreakTime | form}}</p>
					<div class="hr"></div>
					<h4>Cycles</h4>
					<p>Total cycles: {{historyStats.totalCycles}}</p>
					<p>Sessions per cycle: {{avgSessionsPerCycle | toFixedOne}}</p>
					<div class="hr"></div>
					<h4>Pauses</h4>
					<p>Times paused: {{historyStats.pausesAmount}}</p>
					<p>Average pauses per cycle: {{avgPausesPerCycle | toFixedOne}}</p>
					<p>Total pause duration: {{historyStats.totalPauseTime | form}}</p>
					<p>Average pause duration: {{avgPauseDuration | form}}</p>
					<div class="hr-large"></div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import PomoCycleSlider from './PomoCycleSlider';
import moment from 'moment';
import formatDuration from '@/utils/format-duration';
export default {
	components: {
		PomoCycleSlider
	},
	computed: {
		statsOpen() {
			return this.$store.getters.statsOpen;
		},
		cycleArray() {
			return this.$store.getters.cycleArrayDisplay;
		},
		currentSessionId() {
			return this.$store.getters.currentSessionId;
		},
		currentCycleProgress() {
			return (this.currentSessionId + 1) + "/" + this.cycleArray.length;
		},
		history() {
			return this.$store.getters.history;
		},
		historyStats() {
			return this.$store.getters.totalSessionHistoryStats;
		},
		avgSessionsPerCycle() {
			return this.historyStats.totalSessions / this.historyStats.totalCycles;
		},
		avgPauseDuration() {
			return (this.historyStats.totalPauseTime / this.historyStats.pausesAmount) || 0;
		},
		avgPausesPerCycle() {
			return (this.historyStats.pausesAmount / this.historyStats.totalCycles); 
		}
	},
	methods: {
		toggleStats() {
			this.$store.commit('toggleStatsOpen');
		},
		cycleSessionClass(id) {
			if (id < this.currentSessionId) {
				return "finished";
			} else if (id === this.currentSessionId) {
				return "current";
			} else return "future";
		}
	},
	filters: {
		form(ms) {
			let dur = moment.duration(ms);
			let f = "s[s]";
			if (dur.hours() !== 0) {
				f = 'H[h] m[m] ' + f;
			} else if (dur.minutes() !== 0) {
				f = 'm[m] ' + f;
			}
			console.log(dur.minutes());
			console.log(dur.seconds());

			let formatted = formatDuration(ms, f);
			return formatted;
		},
		toFixedOne(n) {
			return Number.parseFloat(n).toFixed(1);
		}
	}
}
</script>

<style scoped>
.cycleList {
	display: flex;
	justify-content: space-between;
	max-width: 100%;
	flex-wrap: wrap;
}

li {
	padding: 0.2rem 0;
}

.hr {
	border-bottom: 1px solid rgba(0,0,0,0.08);
	width: 90%;
	height: 1px;
	margin: 12px auto;
}

.hr-margin {
	margin: 8px auto;
}

.hr-large {
	border-bottom: 1px solid rgba(0,0,0,0.08);
	width: 100%;
	height: 1px;
	margin: 8px auto;
}

h3 {
	font-weight: bold;
	line-height: 2.2;
}

h3 > span {
	font-weight: normal;
	font-size: 90%;
	margin-left: 5px;
	opacity: 0.8;
}

h4 {
	font-weight: bold;
	font-size: 95%;
}

p {
	font-size: 95%;
}

.cycleSession {
	flex: 1 0 7rem;
	text-align: center;
}

.cycleSession.finished {
	opacity: 0.3;
	text-decoration: line-through;
}

.cycleSession.current {
	font-weight: bold;
}

.cycleSession.future {
	opacity: 0.7;
}

.stats-overlay {
	position: fixed;
	z-index: 100;
	height: 100%;
	width: 100%;
	background: rgb(32, 32, 32);
	background: #eeeeee;
	transform-origin: 2rem 2.8rem;
	display: flex;
	flex-direction: column;
}

h2 {
	font-size: 1.25rem;
	font-weight: bold;
	letter-spacing: 0.03em;
}

.top-bar {
	height: 4rem;
	display: grid;
	grid-template-columns: 4rem auto 4rem;
	grid-auto-rows: 100%;
	align-items: center;
	position: relative;
	flex: 0 0 auto;
}

.center {
	grid-column: 2;
}

svg.close-icon {
	width: 33px;
	height: 33px;
}

.right {
	grid-column: 3;
}

.close-button {
	transition: opacity .3s ease;
	width: 38px;
	height: 38px;
	padding-top: 7px;
}

.close-button:hover, .close-button:focus {
	opacity: 1;
}

.fade-enter-active, .fade-leave-active {
	transition:  transform .3s ease, opacity .4s ease;
}

.fade-enter, .fade-leave-to {
	transform: scale(0.3);	
	opacity: 0;	
}

.main {
	flex: 1;
	padding: 0 2rem;
	margin-bottom: 1rem;
	text-align: left;
	overflow-y: scroll;
	align-self: center;
	width: 100%;
}
</style>
