<template>
	<transition name="fade">
		<div class="settings-overlay" v-if="settingsOpen">
			<div class="top-bar">
				<div class="center">
					<h2>Settings</h2>
				</div>
				<div class="right">
					<button class="close-button" @click="toggleSettings">
					<svg class="close-icon" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
					</svg>
				</button>
				</div>
				
			</div>
			<div class="main">
				<div class="input-group-large">
					<p class="input-label">Durations</p>
					<div class="input-group">
						<p class="input-label">Focus</p>
						<input type="range" v-model="settings.focus" min="15" max="60" step="1">
						<span class="input-value">{{settings.focus}}</span>
					</div>
					<div class="input-group">
						<p class="input-label">Short</p>
						<input type="range" v-model="settings.short" min="1" max="15" step="1">
						<span class="input-value">{{settings.short}}</span>
					</div>						
					<div class="input-group">
						<p class="input-label">Long</p>
						<input type="range" v-model="settings.long" min="10" max="60" step="1">
						<span class="input-value">{{settings.long}}</span>
					</div>
				</div>
				<div class="input-group">
					<p class="input-label">Cycle length</p>
					<input type="range" v-model="settings.cycleLength" min="2" max="10">
					<span class="input-value">{{settings.cycleLength}}</span>
				</div>
				<div class="input-group">
					<p class="input-label checkbox">Autoplay</p>
					<input type="checkbox" v-model="settings.autoPlay">
				</div>
				<div class="input-group">
					<p class="input-label checkbox">Sound</p>
					<input type="checkbox" v-model="settings.sound">
				</div>
				<div class="input-group">
					<p class="input-label">Multiply speed</p>
					<input type="range" v-model="settings.speed" min="1" max="200" step="1">
					<span class="input-value">{{settings.speed}}</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { minToMs, msToMin } from '@/utils/time-utils';
export default {
	data() {
		return {
			settings: {},
			settingsPreChange: {}
		}
	},
	computed: {
		settingsOpen() {
			return this.$store.getters.settingsOpen;
		},
		getSettings() {
			return this.$store.getters.getSettings;
		}
	},
	methods: {
		toggleSettings() {
			this.$store.commit('toggleSettingsOpen');
		},
		saveToLocalStorage(settings) {
			let str = JSON.stringify(settings);
			localStorage.setItem('settings', str);
			console.log(localStorage.getItem('settings'));
		}
	},
	beforeMount() {
		let s = JSON.parse(JSON.stringify(this.getSettings));
		for (let dur in s.durations) {
			s[dur] = msToMin(s.durations[dur]);
		}
		delete s.durations;
		console.log(s);
		this.settings = s;

		let pre = JSON.parse(JSON.stringify(s));
		this.settingsPreChange = pre;
	},
	beforeDestroy() {
		let s = this.settings;
		let pre = this.settingsPreChange;

		let changes = {};
		for (let key in s) {
			if (s[key] !== pre[key] && key !== "settingsOpen") {
				if (key === "focus" || key === "long" || key === "short") {
					if (!changes.durations) changes.durations = {};
					changes.durations[key] = minToMs(s[key]);
				} else {
					changes[key] = s[key];
				}
			}
		}
		console.log(changes);
		this.$store.dispatch('changeSettings', changes);
		this.saveToLocalStorage(this.getSettings);
	}
}
</script>

<style scoped>
.settings-overlay {
	position: fixed;
	z-index: 100;
	height: 100%;
	width: 100%;
	background: rgb(32, 32, 32);
	background: #eeeeee;
	transform-origin: calc(100% - 2rem) 2.8rem;
	display: flex;
	flex-direction: column;
	font-size: 14px;
}

.input-value {
	position: absolute;
	right: 0;
	transform: translate(10px, -2px);
	opacity: 0.8;
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
	padding: 0 1em;
	margin-bottom: 1em;
	text-align: left;
	overflow-y: scroll;
	align-self: center;
	width: 70%;
}

.input-group {
	padding-bottom: 1em;
	position: relative;
}

.input-label {
	font-size: 1.2em;
	padding-bottom: 0.4em;
	line-height: 2;
}

.input-label.checkbox {
	display: inline-block;
	width: 40%;
}

.input-group-large > .input-group {
	padding-left: 2em;
}

.input-group-large > .input-label {
	padding-bottom: 0;
}

.input-group-large .input-group .input-label {
	font-size: 1em;
}

input[type="range"] {
	width: calc(100% - 10px);
}
</style>
