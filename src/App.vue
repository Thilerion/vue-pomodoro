<template>
	<div id="app">
		<pomo-nav></pomo-nav>
	</div>
</template>

<script>
import PomoNav from './components/PomoNav'
export default {
  name: 'app',
  components: {
	  PomoNav
  }
}
</script>

<style>
#app {
	font-family: 'Roboto', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: rgba(0,0,0,0.8);
	min-height: 100vh;
	background-image: linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);
}

html {
	height: 100%;
	width: 100%;
}

body {
	min-height: 100%;
}
</style>
