<template>
  <div id="app">
    <flashing></flashing>
	<pomodoro></pomodoro>
  </div>
</template>

<script>
import Pomodoro from './components/Pomodoro'
import Flashing from './components/Flashing'
export default {
  name: 'app',
  components: {
	  Pomodoro,
	  Flashing
  }
}
</script>

<style>
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
