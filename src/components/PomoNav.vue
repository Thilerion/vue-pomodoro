<template>
	<div class="nav-top">
		<div class="nav-item center">
			<h1>Simple Pomodoro</h1>
		</div>
		<div class="nav-item right">
			<img class="menu-icon" src="../assets/menu-icon.svg" height="29" width="29">
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
		font-weight: bold;
		letter-spacing: 0.03em;
	}

	.nav-top {
		height: 4rem;
		display: grid;
		grid-template-columns: 4rem auto 4rem;
		grid-auto-rows: 100%;
		align-items: center;
		position: relative;
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

	.menu-icon {
		opacity: 0.7;
	}
</style>
