<template>
	<div class="nav-top">
		<div class="nav-item center">
			<h1>Simple Pomodoro</h1>
		</div>
		<div class="nav-item right">
			<i class="material-icons">menu</i>
		</div>		
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
	h1 {
		font-size: 1.25rem;
		font-weight: 500;
	}

	.nav-top {
		height: 3rem;
		display: grid;
		grid-template-columns: 3rem auto 3rem;
		grid-auto-rows: 100%;
		align-items: center;
	}

	.nav-item.center {
		grid-column-start: 2;
	}

	.nav-item.right {
		grid-column-start: 3;
		line-height: 0.5;
	}

	.nav-item.left {
		grid-column-start: 1;
	}
</style>
