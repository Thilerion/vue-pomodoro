<template>
  <div id="app">
	<pomodoro></pomodoro>
  </div>
</template>

<script>
import Pomodoro from './components/Pomodoro'
export default {
  name: 'app',
  components: {
	  Pomodoro
  }
}
</script>

<style>
#app {
	font-family: 'Roboto', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
