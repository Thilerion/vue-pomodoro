<template>
	<div class="nav-top">
		<div class="nav-item center">
			<h1>Simple Pomodoro</h1>
		</div>
		<div class="nav-item right">
			<svg class="menu-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 53 53" style="enable-background:new 0 0 53 53;" xml:space="preserve">
				<g>
					<g>
						<path d="M2,13.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,13.5,2,13.5z"/>
						<path d="M2,28.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,28.5,2,28.5z"/>
						<path d="M2,43.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,43.5,2,43.5z"/>
					</g>
				</g>
			</svg>
		</div>		
	</div>
</template>

<script>
export default {};
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
	width: 28px;
	opacity: 0.8;
}
</style>
