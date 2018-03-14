<template>
	<div id="app" class="theme-darker">
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
</template>

<script>
import PomoNav from "./components/PomoNav";
import PomoTimeView from "./components/PomoTimeView";
import PomoControls from "./components/PomoControls";
import PomoSession from './components/PomoSession';
import PomoCycle from './components/PomoCycle';
export default {
	name: "app",
	components: {
		PomoNav,
		PomoTimeView,
		PomoControls,
		PomoSession,
		PomoCycle
	},
	beforeCreate() {
		this.$store.dispatch('initializeTimer');
		console.log("Vue instance, before create, initialized the timer in Vuex store.");
	}
};
</script>

<style>
#app {
	font-family: "Titillium Web", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;	
	min-height: 100vh;	
}

/* GRADIENTS https://webgradients.com/ */

.theme-dark {
	color: rgba(255, 255, 255, 0.9);
	background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; 
 	background-blend-mode: multiply,multiply;
}

.theme-darker {
	color: hsl(210, 50%, 93%);
	background-image: linear-gradient(60deg, hsl(207, 40%, 8%) 0%, hsl(210, 15%, 20%) 100%);
}

.theme-light {
	color: rgb(34, 34, 34);
	background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
}

.theme-clear-mirror {
	color: hsla(222, 10%, 0%, 0.9);
	background-image: linear-gradient(45deg, hsl(222, 38%, 69%) 0%, #e4efe9 100%);
}

.theme-premium-white {
	color: rgba(0,0,0,0.8);
	background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);
}

.theme-morpheus-den {
	background-image: linear-gradient(20deg, #30cfd0 0%, #330867 100%);
	color: #ececec;
}

.theme-sharpeye-eagle {
	background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);
	color: #05021b;
}

.theme-strong-bliss {
	background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
	color: rgb(36, 4, 4);
}

.theme-sky-high {
	background-image: linear-gradient(-30deg, #48c6ef 10%, #6f86d6 90%);
	color: rgb(4, 21, 43);
}

#app {
	display: flex;
	flex-direction: column;
}

nav {
	flex: 0 0 auto;
}

.controls {
	flex: 0 0 auto;
	padding: 1.5rem 0;
	width: 80%;
	margin: auto;
}

main {
	flex: 1;
	position: relative;
	min-height: 300px;
	
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
	grid-row: 8;
}

.grid-time {
 	grid-row: 5 / span 2 ;
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
</style>
