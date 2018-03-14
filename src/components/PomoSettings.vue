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
						<input type="range" v-model="settings.durFocus" min="10" max="60">
					</div>
					<div class="input-group">
						<p class="input-label">Short</p>
						<input type="range" v-model="settings.durShort" min="1" max="15">
					</div>						
					<div class="input-group">
						<p class="input-label">Long</p>
						<input type="range" v-model="settings.durLong" min="10" max="60">
					</div>
				</div>
				<div class="input-group">
					<p class="input-label">Focus session until long break</p>
					<input type="range" v-model="settings.sessionsPerCycle" min="2" max="10">
				</div>
				<div class="input-group">
					<p class="input-label">Autoplay</p>
					<input type="checkbox" v-model="settings.autoPlay">
				</div>
				<div class="input-group">
					<p class="input-label">Sound</p>
					<input type="checkbox" v-model="settings.sound">
				</div>
				<div class="input-group">
					<p class="input-label">Multiply speed</p>
					<input type="range" v-model="settings.speed" min="0" max="15" step="1">
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			settings: {}
		}
	},
	computed: {
		settingsOpen() {
			return this.$store.state.settingsOpen;
		},
		getSettings() {
			let s = this.$store.getters.settings;
			s.speed = Math.round(s.speed / 100);
			return s;
		}
	},
	methods: {
		toggleSettings() {
			this.$store.commit('toggleSettings');
		},
		saveSettings() {
			let s = {};
			s = Object.assign({}, s, this.settings);
			s.speed = Math.max(Math.round((s.speed) * 100), 1);
			s.durLong *= 60 * 1000;
			s.durShort *= 60 * 1000;
			s.durFocus *= 60 * 1000;
			
			for (let key in s) {
				if (typeof s[key] === "string") {
					s[key] = parseInt(s[key]);
				}
			}
			console.log(s);
			this.$store.commit('saveSettings', s);
			this.$store.dispatch('initNewSession');
		}
	},
	watch: {
		settingsOpen(newValue) {
			console.log("Settings changed to: " + newValue);
			if (newValue === true) {
				this.settings = Object.assign({}, this.settings, this.getSettings);
			} else if (newValue === false) {
				this.saveSettings();
			}
		}
	},
	beforeMount() {
		this.settings = Object.assign({}, this.settings, this.getSettings);
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
	transform-origin: calc(100% - 2rem) 2.8rem;
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
	padding: 0 1rem;
	margin-bottom: 1rem;
	text-align: left;
	overflow-y: scroll;
	align-self: center;
	width: 70%;
}

.input-group {
	padding-bottom: 1rem;
}

.input-label {
	font-size: 1.2rem;
	padding-bottom: 0.4rem;
	line-height: 2;
}

.input-group-large > .input-group {
	padding-left: 2rem;
}

.input-group-large > .input-label {
	padding-bottom: 0;
}

.input-group-large .input-group .input-label {
	font-size: 1rem;
}

input[type="range"] {
	width: 100%;
}
</style>
