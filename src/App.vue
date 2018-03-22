<template>
	<div id="app" :class="themeClass">
		<div class="wrapper">
			<div class="overlays">
				<!--<pomo-settings></pomo-settings>-->
				<pomo-settings v-if="settingsOpen"></pomo-settings>
				<pomo-stats v-else-if="statsOpen"></pomo-stats>
				<pomo-sound></pomo-sound>
			</div>
			<nav>
				<pomo-nav></pomo-nav>
			</nav>
			<main>
				<div class="main-wrapper">
				<pomo-session class="grid-session"></pomo-session>
				<pomo-cycle class="grid-cycle"></pomo-cycle>
				<pomo-time-view class="grid-time"></pomo-time-view>
				</div>
				
			</main>	
			<pomo-controls class="controls"></pomo-controls>
		</div>		
	</div>
</template>

<script>
import NoSleep from 'nosleep.js'
const noSleep = new NoSleep();

import PomoNav from "./components/PomoNav";
import PomoTimeView from "./components/PomoTimeView";
import PomoControls from "./components/PomoControls";
import PomoSession from './components/PomoSession';
import PomoCycle from './components/PomoCycle';
import PomoSettings from './components/PomoSettings';
import PomoStats from './components/PomoStats';
import PomoSound from './components/PomoSound';

export default {
	name: "app",
	components: {
		PomoNav,
		PomoTimeView,
		PomoControls,
		PomoSession,
		PomoCycle,
		PomoSettings,
		PomoStats,
		PomoSound
	},
	beforeCreate() {
		this.$store.dispatch('initializeTimer');
		console.log("Vue instance, before create, initialized the timer in Vuex store.");
	},
	computed: {
		settingsOpen() {
			return this.$store.getters.settingsOpen;
		},
		statsOpen() {
			return this.$store.getters.statsOpen;
		},
		theme() {
			return this.$store.getters.theme;
		},
		themeClass() {
			if (this.theme === true) {
				return "theme-dark";
			} else {
				return "theme-premium-white";
			}
		}
	}
};

document.addEventListener('click', () => {enableNoSleep();}, false);
document.addEventListener('touchstart', () => {enableNoSleep();}, false);

const enableNoSleep = () => {
	if (noSleep.noSleepVideo.paused === false) {
		return;
	};
	noSleep.enable();
	console.log("No sleep enabled");
	document.removeEventListener('click', enableNoSleep, false);
	document.removeEventListener('touchstart', enableNoSleep, false);
}
</script>

<style>
html {
	overflow-y: hidden;
}

#app {
	font-family: "Titillium Web", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;	
	min-height: 100vh;	
}

.wrapper {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

/* GRADIENTS https://webgradients.com/ */

:root {
	--focus: hsl(208,79,55);
	--short: hsl(174,50,51);
	--long: hsl(122,50,60);
}

.theme-dark {
	background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(32, 35, 46, 0.315) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(31, 41, 71, 0.527) 120%) #74717e; 
 	background-blend-mode: multiply,multiply;
	color: rgb(243, 243, 243);
	--background-color: rgb(32, 32, 32);
	--background-color-overlay: #363342;
	--background-color-overlay-blend-mode: normal;
	--text-color-main: rgb(243, 243, 243);
	--slider-thumb: rgb(235, 235, 235);
	--slider-thumb-contrast1: rgb(230, 230, 230);
	--text-color-contrast1: rgb(218, 218, 218);
	--text-color-alpha03: rgba(236, 236, 236, 0.3);
}

.theme-light {
	color: rgb(34, 34, 34);
	background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
	--background-color: rgb(235, 235, 235);
	--background-color-overlay: rgb(230, 230, 230);
	--background-color-overlay-blend-mode: normal;
	--text-color-main: rgb(34, 34, 34);
	--text-color-contrast1: rgb(22, 22, 22);
}

.theme-premium-white {
	color: rgba(0,0,0,0.8);
	background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);
	--background-color: rgb(235, 235, 235);
	--background-color-overlay: rgb(230, 230, 230);
	--background-color-overlay-blend-mode: normal;
	--text-color-main: rgb(34, 34, 34);
	--slider-thumb: rgb(235, 235, 235);
	--slider-thumb-contrast1: rgb(194, 194, 194);
	--text-color-contrast1: rgb(54, 54, 54);
	--text-color-alpha03: rgba(168, 168, 168, 0.3);
}

nav {
	flex: 0 0 auto;
}

.controls {
	flex: 0 0 auto;
	padding: 0.2rem 0;
	width: 80%;
	margin: auto;
}

main {
	flex: 1;
	position: relative;	
}

.main-wrapper {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	height: 100%;
	max-height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(10, minmax(10%, max-content));
}

.grid-session {
	grid-row: 2;
}

.grid-cycle {
	grid-row: 8 / span 1;
	align-self: center;
}

.grid-time {
 	grid-row: 4 / span 4 ;
}

i, button {
	color: inherit;
}

button {
	margin: 0;
	padding: 0;
	border: none;
	background: none;
	outline: none;
	cursor: pointer;
}

svg {
	fill: currentColor;
}

html {
	height: 100%;
	width: 100%;
}

body {
	min-height: 100%;
}

.overlays {
	position: absolute;
	height: 100%;
	width: 100%;
}

@media (max-height: 400px) {
	.main-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		max-width: 400px;
		margin: auto;
	}

	.grid-cycle {
		order: 1;
	}

	html {
		font-size: 80%;
	}

	.wrapper {
		width: calc(80%);
		max-width: 800px;
		margin: auto;
		min-height: 210px;
		height: 100vh;
	}

	.overlays {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		max-width: 100%;
	}

	.overlays > div.settings-overlay {
		position: absolute;
	}
}

@media (max-width: 600px) {
		.wrapper {
			width: 100%;
		}
	}
</style>
