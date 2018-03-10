<template>
	<div class="progress">
		<div class="inner-progress" :style="{width: `${$store.getters.percentageRemaining}%`}"></div>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.progress {
	display: block;
	margin: 1em 0;
	width: 80%;
	height: 20px;
	border: 1px solid grey;
	border-radius: 5px;
	padding: 0;
	background: lightgray;
}

.inner-progress {
	background-color: green;
	height: 100%;
	transition: width 500ms linear;
}
</style>
