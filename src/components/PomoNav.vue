<template>
	<div class="nav-top">
		<div class="nav-item left">
			<button class="stats-button" @click="toggleStatsOpen">
				<svg viewBox="0 0 24 24" class="stats-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<defs>
						<path d="M0 0h24v24H0V0z" id="a"/>
					</defs>
					<clipPath id="b">
						<use overflow="visible" xlink:href="#a"/>
					</clipPath>
					<path clip-path="url(#b)" d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"/>
				</svg>
			</button>
		</div>
		<div class="nav-item center">
			<h1>Simple Pomodoro</h1>
		</div>
		<div class="nav-item right">
			<button class="settings-button" @click="toggleSettingsOpen">
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
export default {
	methods: {
		toggleSettingsOpen() {
			this.$store.commit('toggleSettingsOpen');
		},
		toggleStatsOpen() {
			this.$store.commit('toggleStatsOpen');
		}
	}
};
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

.settings-icon, .stats-icon {
	height: 28px;
	width: 28px;
}

.settings-button, .stats-button {
	width: 38px;
	height: 38px;
	padding: 5px;
	opacity: 0.7;
	transition: opacity .3s ease;
}

.settings-button:hover, .settings-button:focus, .stats-button:hover, .stats-button:focus {
	opacity: 1;
}
</style>
