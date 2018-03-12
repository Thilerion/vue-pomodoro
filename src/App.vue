<template>
	<div id="app">
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
	color: rgba(0, 0, 0, 0.8);
	min-height: 100vh;
	background-image: linear-gradient(135deg, #90f7ec 10%, #32ccbc 100%);
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
