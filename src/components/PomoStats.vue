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
				<div class="cycleDiv faded">
					<ul class="cycleList" ref="sessionList">
						<li class="cycleSession" v-for="(session, index) in cycleArray" :key="index" :ref="'session' + index" :class="cycleSessionClass(index)">{{session}}</li>
					</ul>
				</div>
				
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	computed: {
		statsOpen() {
			return this.$store.getters.statsOpen;
		},
		cycleArray() {
			return this.$store.getters.cycleArrayDisplay;
		},
		currentSessionId() {
			return this.$store.getters.currentSessionId;
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
	mounted() {
		for (let i = 0; i < this.cycleArray.length; i++) {
			let refName = "session" + i;
			console.log(this.$refs[refName][0]);
			if (i === this.currentSessionId) {
				console.log("Current session!");
			}
		}
	}
}
</script>

<style scoped>
.cycleList {
	display: flex;
	justify-content: space-between;
	max-width: 100%;
	overflow: hidden;
}

.cycleDiv {
	overflow: hidden;
	width: 100%;
	border: 1px solid black;
}

.faded {
	position: relative;
}

.faded:after {
	content: '';
	position: absolute;
	left: 0; right: 0;
	top: 0; bottom: 0;
	background-image: linear-gradient(to right, #eee, rgba(0,128,128,0) 50px),
    linear-gradient(to left , #eee, rgba(0,128,128,0) 50px);
}

.cycleSession {
	min-width: 6rem;
	flex: 1 0 auto;
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
	opacity: 0.8;
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
