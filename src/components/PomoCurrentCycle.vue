<template>
	<div class="cycle-graph" :class="refreshClass">
		<div
		class="cycle-row"
		v-for="(sess, index) in cycleArray"
		:key="index"
		:style="sessionStyle(index, sess)"
		>
			<transition name="arrow-trans">
			<div class="cur-arrow" v-if="index === currentIndex" :style="currentArrowStyle"></div>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			refreshingComponent: false
		}
	},
	computed: {
		cycleArray() {
			return this.$store.getters.cycleArray;
		},
		cycleLengths() {
			return this.cycleArray.map((sess) => {
				return this.$store.getters.sessionTypeDuration(sess);
			});
		},
		totalLength() {
			return this.cycleLengths.reduce((acc, val) => {
				return acc + val;
			}, 0);
		},
		accumulativeOffsets() {
			let acc = [0];
			let counter = 0;
			this.cycleLengths.forEach((sess, ind) => {
				if (ind === this.cycleLengths.length) return;
				acc.push(sess / this.totalLength + counter);
				counter += sess / this.totalLength;
			});
			return acc;
		},
		currentIndex() {
			return this.$store.getters.currentSessionId;
		},
		currentSessionPercentage() {
			return this.$store.getters.currentSessionPercentage;
		},
		currentArrowStyle() {
			let current = Math.min(this.currentSessionPercentage, 95);
			return {
				'left': `calc(${current}% - 3px)`
			}
		},
		refreshClass() {
			if (this.refreshingComponent === true) {
				return "refresh";
			} else return "no-refresh";
		}
	},
	methods: {
		sessionStyle(n, sess) {
			let currentSession = this.currentIndex;
			let h, s, l, a = 1;
			if (sess === "focus") {
				h = 208;
				s = 79;
				l = 55;
			} else if (sess === "short") {
				h = 174;
				s = 50;
				l = 51;
			} else if (sess === "long") {
				h = 122;
				s = 50;
				l = 60;
			}

			if (n < currentSession) {
				s *= 0.35;
				l *= 1.2;
				a = 0.7;
			}

			console.log({'background': `hsla(${h},${s}%,${l}%,${a})`});

			return {
				'width': `${this.cycleLengths[n] / this.totalLength * 100}%`,
				'left': `${this.accumulativeOffsets[n] * 100}%`,
				'background': `hsla(${h},${s}%,${l}%,${a})`
			}
		}
	},
	filters: {
		round(n) {
			return Math.round(n * 100) / 100;
		}
	},
	watch: {
		currentIndex(newValue, oldValue) {
			if (newValue === 0 && newValue < oldValue) {
				this.refreshingComponent = true;
				setTimeout(() => {
					this.refreshingComponent = false;
				}, 800);
			}
		}
	}
}
</script>

<style>
.cycle-graph {
	min-height: 20px;
	transition: all .3s ease;
}

.cycle-row {
	height: 15px;
	background: green;
	font-size: 10px;
	display: flex;
	align-items: center;
	position: relative;
	border-radius: 10px;
	transition: all .3s ease;
}

.cur-arrow {
	position: absolute;
	bottom: -5px;
	width: 2px;
	height: 0;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-bottom: 6px solid var(--text-color-main);
	transition: all 1s linear;
}

.refresh {
	opacity: 0;
}

.no-refresh {
	opacity: 1;
}

.arrow-trans-enter-active, .arrow-trans-leave-active {
	transition: all .4s ease;
}

.arrow-trans-enter, .arrow-trans-leave-to {
	opacity: 0;
}
</style>
