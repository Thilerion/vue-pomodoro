<template>
	<div class="nav-top">
		<div class="nav-item center">
			<h1>Simple Pomodoro</h1>
		</div>
		<div class="nav-item right">
			<button class="settings-button">
				<!-- MENU ICON 
				<svg class="menu-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53 53" style="enable-background:new 0 0 53 53;" xml:space="preserve">
					<g>
						<g>
							<path d="M2,13.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,13.5,2,13.5z"/>
							<path d="M2,28.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,28.5,2,28.5z"/>
							<path d="M2,43.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,43.5,2,43.5z"/>
						</g>
					</g>
				</svg> -->
				<!-- SETTINGS ICON -->
				<svg class="settings-icon" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
				</svg>
			</button>
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
}

.settings-icon {
	height: 28px;
	width: 28px;
}

.settings-button {
	width: 38px;
	height: 38px;
	padding: 5px;
	opacity: 0.7;
	transition: opacity .3s ease;
}

.settings-button:hover, .settings-button:focus {
	opacity: 1;
}
</style>
