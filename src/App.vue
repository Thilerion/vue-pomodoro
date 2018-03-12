<template>
	<div id="app" class="theme-premium-white">
		<nav>
			<pomo-nav></pomo-nav>
		</nav>
		<main>
			<pomo-time-view></pomo-time-view>
			<pomo-controls></pomo-controls>
		</main>	
	</div>
</template>

<script>
import PomoNav from "./components/PomoNav";
import PomoTimeView from "./components/PomoTimeView";
import PomoControls from "./components/PomoControls";
export default {
	name: "app",
	components: {
		PomoNav,
		PomoTimeView,
		PomoControls
	}
};
</script>

<style>
#app {
	font-family: "Roboto", sans-serif;
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

.theme-light {
	color: rgba(0,0,0,0.8);
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

#app {
	display: grid;
	grid-template-rows: 3rem auto;
}

html {
	height: 100%;
	width: 100%;
}

body {
	min-height: 100%;
}

main {
	display: grid;
	grid-template-rows: auto 10rem;
	align-items: center;
}
</style>
