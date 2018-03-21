<template>
	<div>
		<div class="timeline">
			<div 
				class="timeline-cell"
				v-for="(p, index) in generateDays"
				:key="index"
				:style="timelineCellStyle(p, index)"
				>
			</div>
		</div>
	</div>

</template>

<script>
import moment from 'moment';
export default {
	computed: {
		historyByDay() {
			let days = {};
			//return this.arrayToFocusTime(this.history[0]);
			this.history.forEach((cycle) => {
				if (cycle.length >= 1) {
					let date = cycle[0].instantiated;
					let dateString = new Date(date).toLocaleDateString();
					let focusTime = this.arrayToFocusTime(cycle);
					if (!days[dateString]) days[dateString] = focusTime;
					else days[dateString] += focusTime;
				}			
			});
			return days;
		},
		history() {
			return this.$store.getters.history;
		},
		historyByDayPercentages() {
			let hByDay = this.historyByDay;
			let times = [];
			for (let day in hByDay) {
				times.push(hByDay[day]);
			}
			let max = Math.max(...times);
			let min = Math.min(...times);
			for (let day in hByDay) {
				hByDay[day] = Math.round((hByDay[day] * 100 / max) * 10) / 10;
			}
			return hByDay;
		},
		historyByDayPercentagesRounded() {
			let percentages = this.historyByDayPercentages;
			let rounded = {};
			for (let day in percentages) {
				let p = percentages[day];
				rounded[day] = (Math.ceil(p / 10) * 10);
			}
			return rounded;
		},
		generateDays() {
			let days = this.historyByDayPercentagesRounded;
			let today = moment();
			let allDays = [];
			for (let i = 0; i < 42; i++) {
				let genDay = today.clone().subtract(i, 'days').format("D-M-Y");
				console.log(genDay);
				if (days.hasOwnProperty(genDay)) {
					console.log(days[genDay]);
					allDays.unshift(days[genDay]);
				} else {
					allDays.unshift(0);
				}
			}
			return allDays;
		}
	},
	methods: {
		arrayToFocusTime(arr) {
			return arr.reduce((acc, sess) => {
				if (sess.type === "focus") return acc + sess.totalTime;
				else return acc;
			}, 0);
		},
		timelineCellStyle(p, index) {
			let opacity = 0.1 + (p*0.009);
			let h = 100;
			let s = 30 + (p*0.6);
			let l = 25 + (p*0.2);
			let bgStyle = {
				'background': `hsla(${h}, ${s}%, ${l}%, ${opacity})`
			};
			if (index === 41) bgStyle['border'] = '2px solid rgba(0,0,0,0.4)';
			return bgStyle;
		}
	}
}
</script>

<style>
.timeline {
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(14, calc(7.14vw - 0.55rem));
	grid-template-rows: repeat(3, calc(7.14vw - 0.55rem));
	grid-gap: 4px;
}

.timeline-cell {
	width: 100%;
	height: 100%;
	background: hsla(114, 13%, 47%, 0.11);
	border-radius: 2px;
	font-size: 10px;
}
</style>
